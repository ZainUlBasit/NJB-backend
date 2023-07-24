const CustomerTransaction = require("../Models/CustomerTransaction");

const AddTransaction = async (req, res, next) => {
  const { bill, customerid, name, qty, price, amount, date } = req.body;
  let cTransaction;
  try {
    cTransaction = new CustomerTransaction({
      customerid,
      name,
      qty,
      price,
      amount,
      date,
      bill,
    });
    await cTransaction.save();
  } catch (err) {
    console.log("Error Occured:", err.message);
  }
  if (!cTransaction)
    return res.status(500).json({ message: "Unable to Add Transaction" });
  else return res.status(201).json({ cTransaction });
};

const GetTransaction = async (req, res, next) => {
  const { id, fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  let cTransaction;
  try {
    cTransaction = await CustomerTransaction.find({
      customerid: id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (!cTransaction) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(cTransaction);
};

exports.AddTransaction = AddTransaction;
exports.GetTransaction = GetTransaction;
