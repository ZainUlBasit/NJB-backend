const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqStr = {
  type: String,
  required: true,
};

const reqNum = {
  type: Number,
  required: true,
};

const reqDate = {
  type: Date,
  required: true,
};

const TransactionSchema = new Schema({
  user_id: reqStr,
  bank: reqStr,
  accountno: reqNum,
  amount: reqNum,
  depositor: reqStr,
  date: reqDate,
  cnicno: reqNum,
  contact: reqStr,
});

module.exports = mongoose.model("Transactions", TransactionSchema);
