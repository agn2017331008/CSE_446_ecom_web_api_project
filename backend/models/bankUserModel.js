const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const bankuserSchema = new mongoose.Schema({
 
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [3, "Password should be greater than 3 characters"],
    select: false,
  },
  balance: {
    type: Number,
    required: [true, "Please Enter your bank balance"],
    maxLength: [8, "Balance cannot exceed 8 characters"],
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

 
});

bankuserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// JWT TOKEN
bankuserSchema.methods.getJWTToken = function () {
  console.log("JWTToken function")
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// Compare Password

bankuserSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };


module.exports = mongoose.model("BankUser", bankuserSchema);
