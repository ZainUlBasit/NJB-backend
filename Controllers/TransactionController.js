const Transactions = require("../Models/Transactions");

const AddTransaction = async (req, res, next) => {
  let {
    user_id,
    bank,
    accountno,
    amount,
    depositor,
    date,
    cnicno,
    contact,
    type,
  } = req.body;
  date = new Date(date);
  let transaction;
  try {
    transaction = new Transactions({
      user_id,
      bank,
      accountno,
      amount,
      depositor,
      date,
      cnicno,
      contact,
      type,
    });
    await transaction.save();
    console.log(transaction);
  } catch (err) {
    console.log("Error", err.message);
  }
  if (!transaction) {
    return res.status(500).json({ message: "Unable to Add transaction" });
  }
  return res.status(201).json({ transaction });
};

const GetTransactions = async (req, res, next) => {
  const { id, fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  let transaction;
  try {
    transaction = await Transactions.find({
      user_id: id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  } catch (err) {
    console.log("Error", err.message);
  }
  if (!transaction) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(transaction);
};

const GetAllTransactions = async (req, res, next) => {
  const { fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  let transaction;
  try {
    transaction = await Transactions.find({
      date: { $gte: startDate, $lte: endDate },
    });
  } catch (err) {
    console.log("Error", err.message);
  }
  if (!transaction) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(transaction);
};

exports.AddTransaction = AddTransaction;
exports.GetTransactions = GetTransactions;
exports.GetAllTransactions = GetAllTransactions;
