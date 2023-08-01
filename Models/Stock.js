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

const stockSchema = new Schema({
  company_id: reqStr,
  name: reqStr,
  purchase: reqNum,
  qty: reqNum,
  desc: reqStr,
  invoice: reqStr,
  truck: reqStr,
  date: reqDate,
});

module.exports = mongoose.model("Stock", stockSchema);