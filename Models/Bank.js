const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const reqStr = {
  type: String,
  required: true,
};

const BankSchema = new Schema({
  bankname: reqStr,
  accountno: reqStr,
});

module.exports = mongoose.model("Bank", BankSchema);
