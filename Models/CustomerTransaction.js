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

const CustomerTransactionSchema = new Schema({
  customerid: reqStr,
  name: reqStr,
  qty: reqNum,
  price: reqNum,
  amount: reqNum, // description
  date: reqDate,
  bill: reqNum,
});

module.exports = mongoose.model(
  "CustomerTransaction",
  CustomerTransactionSchema
);
