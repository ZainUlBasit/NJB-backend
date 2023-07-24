const Expense = require("../Models/Expense");

const AddExpense = async (req, res, next) => {
  const { type, desc, expense, date } = req.body;
  let expenses;
  try {
    expenses = new Expense({
      type,
      desc,
      expense,
      date: new Date(date),
    });
    expenses.save();
  } catch (err) {
    console.log("Error:", err.message);
  }

  if (!expenses)
    return res.status(500).json({ message: "Unable to add Expenses" });
  else return res.status(201).json(expenses);
};

const GetExpense = async (req, res, next) => {
  const { fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  let expenses;
  try {
    expenses = await Expense.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    console.log(expenses);
  } catch (err) {}
  if (!expenses) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(expenses);
};

exports.AddExpense = AddExpense;
exports.GetExpense = GetExpense;
