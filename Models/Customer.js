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

const CustomerSchema = new Schema({
  name: reqStr,
  address: reqStr,
  contact: reqStr,
  cnic: reqStr, // description
  total: reqNum,
  remaining: reqNum,
  paid: reqNum,
  discount: reqNum,
  advance: reqNum,
});

module.exports = mongoose.model("Customer", CustomerSchema);