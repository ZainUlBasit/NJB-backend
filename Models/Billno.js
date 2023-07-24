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

const BillNoSchema = new Schema({
  billno: reqNum,
});

module.exports = mongoose.model("BillNo", BillNoSchema);
