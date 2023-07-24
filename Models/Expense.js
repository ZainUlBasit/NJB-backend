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

const ExpenseSchema = new Schema({
  type: reqStr,
  desc: reqStr,
  expense: reqNum,
  date: reqDate,
});

module.exports = mongoose.model("Expense", ExpenseSchema);