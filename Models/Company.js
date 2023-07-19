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

const CompanySchema = new Schema({
  name: reqStr,
  contact: reqStr,
  desc: reqStr, // description
  address: reqStr,
  total: reqNum,
  paid: reqNum,
  remaining: reqNum,
});

module.exports = mongoose.model("Company", CompanySchema);
