const CustomerReturn = require("../Models/CustomerReturn");

const AddTransaction = async (req, res, next) => {
  const { bill, customerid, desc, purchase, name, qty, price, amount, date } =
    req.body;
  let cReturn;
  try {
    cReturn = new CustomerReturn({
      customerid,
      name,
      qty,
      price,
      amount,
      date,
      bill,
      desc,
      purchase,
    });
    await cReturn.save();
  } catch (err) {
    console.log("Error Occured:", err.message);
  }
  if (!cReturn)
    return res.status(500).json({ message: "Unable to Add Transaction" });
  else return res.status(201).json({ cReturn });
};

const GetTransaction = async (req, res, next) => {
  const { id, fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  let cReturn;
  try {
    cReturn = await CustomerReturn.find({
      customerid: id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
  } catch (err) {
    console.log(err);
  }
  if (!cReturn) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(cReturn);
};

const GetAllTransaction = async (req, res, next) => {
  let startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  let cReturn;
  try {
    cReturn = await CustomerReturn.find({
      date: {
        $gte: startDate,
      },
    });
    console.log(startDate, cReturn);
  } catch (err) {
    console.log(err);
  }
  if (!cReturn) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(cReturn);
};

exports.AddTransaction = AddTransaction;
exports.GetTransaction = GetTransaction;
exports.GetAllTransaction = GetAllTransaction;
