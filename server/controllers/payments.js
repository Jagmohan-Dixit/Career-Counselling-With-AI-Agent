const { instance } = require("../config/razorpay")
const Course = require("../models/Course")
const crypto = require("crypto")
const User = require("../models/User")
const Plan = require("../models/Plan")
const Subscription = require("../models/Subscription")
const mailSender = require("../utils/mailSender")
const mongoose = require("mongoose")
const {courseEnrollmentEmail,} = require("../mail/templates/courseEnrollmentEmail")
const { paymentSuccessEmail } = require("../mail/templates/paymentSuccessEmail")
const CourseProgress = require("../models/CourseProgress")

// Capture the payment and initiate the Razorpay order
exports.capturePayment = async (req, res) => {
  console.log("Inside capturePayment")
  const userId = req.body
  const { amount } = req.body
  // const { courses } = req.body
  // if (!courses || courses.length === 0) {
  //   return res.json({ 
  //     success: false, 
  //     message: "Please Provide Course ID" 
  //   })
  // }

  let total_amount = amount;

  // for (const course_id of courses) {
  //   let course
  //   try {
  //     // Find the course by its ID
  //     course = await Course.findById(course_id)

  //     // If the course is not found, return an error
  //     if (!course) {
  //       return res.json({ 
  //         success: false, 
  //         message: "Could not find the Course" 
  //       })
  //     }

  //     // Check if the user is already enrolled in the course
  //     const uid = new mongoose.Types.ObjectId(userId)
  //     if (course.studentsEnrolled.includes(uid)) {
  //       return res.status(400).json({ 
  //         success: false, 
  //         message: "Student is already Enrolled" 
  //       })
  //     }

  //     // Add the price of the course to the total amount
  //     total_amount += course.price
  //   } catch (error) {
  //     console.log(error)
  //     return res.status(500).json({ 
  //       success: false, 
  //       message: 'Error in adding course' 
  //     })
  //   }
  // }
  // console.log("Total amount: ", total_amount)

  const options = {
    amount: total_amount * 100,
    currency: "INR",
    receipt: `${Date.now()}${Math.floor(Math.random() * 1000)}`,
    notes:{
      userId,
      // courses
    }
  }
  console.log("Options: ", options)

  try {
    // Initiate the payment using Razorpay
    const paymentResponse = await instance.orders.create(options)
    console.log("Payment response: ", paymentResponse)
    res.status(200).json({
      success: true,
      paymentResponse,
      // courses,
      orderId: paymentResponse.id,
      currecy: paymentResponse.currency,
      amount: paymentResponse.amount
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({ 
      success: false, 
      message: "Could not initiate order." 
    })
  }
}




// verify the payment
exports.verifyPayment = async (req, res) => {
  const {razorpay_order_id, razorpay_payment_id, razorpay_signature, planId} = req.body;
  const userId = req.user.id;
  console.log(razorpay_order_id, razorpay_payment_id, razorpay_signature, userId)

  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    // !courses ||
    !userId
  ) {
    return res.status(400).json({ 
      success: false, 
      message: "Payment Failed" 
    })
  }

  let body = razorpay_order_id + "|" + razorpay_payment_id

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")

  if (expectedSignature === razorpay_signature) {
    // await enrollStudents(courses, userId, res)
    const subscription_response = await saveSubscription(planId, userId, razorpay_payment_id, res);
    return res.status(200).json({ 
      success: true, 
      message: "Payment Verified",
      data : subscription_response
    })
  }

  return res.status(400).json({ 
    success: false, 
    message: "Payment Failed" 
  })
}




// Send Payment Success Email
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, amount } = req.body
  const userId = req.user.id

  if (!razorpay_order_id || !razorpay_payment_id || !amount || !userId) {
    return res.status(400).json({ 
      success: false, 
      message: "Please provide all the details" 
    })
  }

  try {
    const enrolledStudent = await User.findById(userId)
    console.log("enrolledStudent : ", enrolledStudent)
    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        razorpay_order_id,
        razorpay_payment_id
      )
    )
    return res.status(200).json({ 
      success: true, 
      message: "Email sent to " +  enrolledStudent.email
    })
  } catch (error) {
    console.log("error in sending mail", error)
    return res.status(400).json({ 
      success: false, 
      message: "Could not send email" 
    })
  }
}




// enroll the student in the courses
const saveSubscription = async (planId, userId, paymentId, res) => {
  planId = "681a367723bf6e22c092f994";
  const plan = await Plan.findById(planId);
  console.log(plan, planId, userId, paymentId)
  if (!planId || !userId || !paymentId || !plan) {
    return res.status(400).json({ 
      success: false, 
      message: "Please Provide Payment ID and User ID and Subscription ID" 
    })
  }

  try {
    const isTaken = await Subscription.findOne({planId : planId, userId : userId});
    if(isTaken) {
      return {
        success: true, 
        message : "Subscription is already taken",
        data : isTaken
      }
    }
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + plan.durationInMonths);

    const newSubscription = new Subscription({
      userId: userId,
      planId: planId,
      price: plan.price,
      startDate,
      endDate,
      paymentId: paymentId,
      isActive: true
    });

    const saved = await newSubscription.save();
    // return saved;
    return {
      success: true, 
      data : saved
    }
  } catch (error) {
    console.error('Error saving subscription:', error);
    return res.status(400).json({
      success: false, 
      message: "Could not save subscription data in database" 
    })
  }
}