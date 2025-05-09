// Import the required modules
const express = require("express")
const router = express.Router()
const {capturePayment,
  verifyPayment, 
  sendPaymentSuccessEmail} = require("../controllers/payments")
// const {capturePayment,
//   verifyPayment, 
//   sendPaymentSuccessEmail} = require("../controllers/fakePayment")
const { auth, isStudent } = require("../middleware/auth")

// Payment routes
router.post("/capturePayment", auth, capturePayment)
router.post("/verifyPayment", auth, verifyPayment)
router.post("/sendPaymentSuccessEmail", auth, sendPaymentSuccessEmail)


module.exports = router
