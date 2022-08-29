const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Transaction = require("../models/transaction")
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BankUser = require("../models/bankUserModel")

exports.processPayment = catchAsyncErrors(async (req, res, next) => {

  const {fromBankUser, toBankUser, amount} = req.body
    //Transaction before product creation
    

    
    const fromBankUser_res  =  await BankUser.findById(fromBankUser);
   
    fromBankUser_res.balance -= amount;
    
    console.log(fromBankUser_res)
    const toBankUser_res = await BankUser.findById(toBankUser);
    console.log(toBankUser_res)
    toBankUser_res.balance += amount;
   

    
    await fromBankUser_res.save({ validateBeforeSave: false });
    await toBankUser_res.save({ validateBeforeSave: false });
   
  
  const transaction = await Transaction.create(req.body);

  res
    .status(200)
    .json({ success: true, transaction_id: transaction._id });
});

// exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
//   res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
// });
