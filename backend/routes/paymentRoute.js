const express = require("express");
const {
  processPayment,
  // sendStripeApiKey,
} = require("../controllers/paymentController");
const router = express.Router();
const { isAuthenticatedUser , isAuthenticatedbankUser } = require("../middleware/auth");

router.route("/payment/process").post(isAuthenticatedUser, isAuthenticatedbankUser, processPayment);

// router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
