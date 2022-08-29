const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  fromBankUser: {
    type: mongoose.Schema.ObjectId,
    ref: "BankUser",
    required: true,
  },
  toBankUser: {
    type: mongoose.Schema.ObjectId,
    ref: "BankUser",
    required: true,
  },
  amount: {
    type: Number,
    required: [true, "Please Enter product Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
