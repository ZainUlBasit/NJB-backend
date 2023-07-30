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

const CustomerReturnSchema = new Schema({
  customerid: reqStr,
  desc: reqStr,
  name: reqStr,
  qty: reqNum,
  purchase: reqNum,
  price: reqNum,
  amount: reqNum, // description
  date: reqDate,
  bill: reqNum,
});

module.exports = mongoose.model(
  "CustomerReturn",
  CustomerReturnSchema
);
