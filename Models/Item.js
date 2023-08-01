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

const itemSchema = new Schema({
  name: reqStr,
  desc: reqStr,
  company: reqStr,
  //without expense
  purchase: reqNum,
  //with expense
  purchasee: reqNum,
  sale: reqNum,
  qty: reqNum,
  addeddate: reqDate,
});

module.exports = mongoose.model("Item", itemSchema);