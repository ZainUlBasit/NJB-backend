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

const BankSchema = new Schema({
  bankname: reqStr,
  accountno: reqStr,
  amount: reqNum,
});

module.exports = mongoose.model("Bank", BankSchema);
