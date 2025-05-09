const { contactUsEmail } = require("../mail/templates/contactFormRes")
const mailSender = require("../utils/mailSender")
const Contact = require("../models/Contact")

exports.contactUsController = async (req, res) => {
  console.log("Contact us data: ",req.body)
  const { name, email, message, phoneNo } = req.body
  if(!email || !name || !message || !phoneNo){
    return res.status(401).json({
      success: false,
      message: "All Fields are required"
    })
  }
  try {
    const contact = await Contact.create({
      email,
      name,
      message,
      contactNumber: phoneNo
    })

    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, name, message, phoneNo)
    )
    console.log("Email Res ", emailRes)
    return res.json({
      success: true,
      data: contact,
      message: "Email send successfully",
    })
  } catch (error) {
    console.log("Error message :", error.message)
    return res.json({
      success: false,
      message: "Something went wrong...",
    })
  }
}
