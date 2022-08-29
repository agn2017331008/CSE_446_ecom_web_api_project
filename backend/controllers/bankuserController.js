const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const BankUser = require("../models/bankUserModel");
const sendTokenbankuser = require("../utils/bankuserjwtToken");

const crypto = require("crypto");


// Register a User
exports.registerBankUser = catchAsyncErrors(async (req, res, next) => {

  const { email, password, balance } = req.body;

  const bankuser = await BankUser.create({
    
    email,
    password,
    balance
  });

  sendTokenbankuser(bankuser, 201, res);
});

// Login User
exports.loginBankUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const bankuser = await BankUser.findOne({ email }).select("+password");
 

  if (!bankuser) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await bankuser.comparePassword(password);
 
  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  sendTokenbankuser(bankuser, 200, res);
});

// Logout User
exports.logoutBankUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("bankusertoken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});




// Get User Detail
exports.getbankUserDetails = catchAsyncErrors(async (req, res, next) => {
  const bankuser = await BankUser.findById(req.bankuser.id);

  res.status(200).json({
    success: true,
    bankuser,
  });
});


// // Get all users(admin)
// exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
//   const users = await User.find();

//   res.status(200).json({
//     success: true,
//     users,
//   });
// });

// // Get single user (admin)
// exports.getSingleUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`)
//     );
//   }

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

// // update User Role -- Admin
// exports.updateUserRole = catchAsyncErrors(async (req, res, next) => {
//   const newUserData = {
//     name: req.body.name,
//     email: req.body.email,
//     role: req.body.role,
//   };

//   await User.findByIdAndUpdate(req.params.id, newUserData, {
//     new: true,
//     runValidators: true,
//     useFindAndModify: false,
//   });

//   res.status(200).json({
//     success: true,
//   });
// });

// // Delete User --Admin
// exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
//   const user = await User.findById(req.params.id);

//   if (!user) {
//     return next(
//       new ErrorHander(`User does not exist with Id: ${req.params.id}`, 400)
//     );
//   }

//   const imageId = user.avatar.public_id;

//   await cloudinary.v2.uploader.destroy(imageId);

//   await user.remove();

//   res.status(200).json({
//     success: true,
//     message: "User Deleted Successfully",
//   });
// });
