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

const ChargesSchema = new Schema({
  bill_id: reqNum,
  paid: reqNum,
  total: reqNum,
  advance: reqNum,
  loading_charges: reqNum,
  delivery_charges: reqNum,
  discount: reqNum,
  date: reqDate,
});

module.exports = mongoose.model("Charges", ChargesSchema);
