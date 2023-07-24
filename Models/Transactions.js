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
  date: reqDate,
  depositor: reqStr,
  accountno: reqNum,
  cnicno: reqNum,
  amount: reqNum,
});

module.exports = mongoose.model("Transactions", TransactionSchema);
