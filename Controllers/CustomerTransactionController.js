const CustomerTransaction = require("../Models/CustomerTransaction");

const AddTransaction = async (req, res, next) => {
  const { bill, customerid, desc, purchase, name, qty, price, amount, date } =
    req.body;
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
      desc,
      purchase,
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

const GetAllTransaction = async (req, res, next) => {
  let cTransaction;
  try {
    cTransaction = await CustomerTransaction.find({});
  } catch (err) {
    console.log(err);
  }
  if (!cTransaction) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(cTransaction);
};
const GetAllTransactionByDate = async (req, res, next) => {
  let startDate = new Date();
  startDate.setUTCHours(0, 0, 0, 0);
  let cTransaction;
  try {
    cTransaction = await CustomerTransaction.find({
      date: {
        $gte: startDate,
      },
    });
    console.log(startDate, cTransaction);
  } catch (err) {
    console.log(err);
  }
  if (!cTransaction) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(cTransaction);
};

const DeleteInvoice = async (req, res, next) => {
  const invoiceNo = req.params.id;
  try {
    // Retrieve the criteria for deleting items from the request body
    const criteria = { bill: invoiceNo };

    // Perform any necessary validation checks on the input data
    if (!criteria || typeof criteria !== "object") {
      return res
        .status(400)
        .json({ message: "Invalid criteria for deletion." });
    }

    // Use Mongoose to delete the items matching the provided criteria
    // The `deleteMany` function will delete all documents that match the given criteria
    const deleteResult = await CustomerTransaction.deleteMany(criteria);

    // `deleteResult` contains information about the delete operation
    // You can access the number of deleted documents using `deleteResult.deletedCount`
    return res.status(200).json({
      message: "Items deleted successfully.",
      deletedCount: deleteResult.deletedCount,
    });
  } catch (error) {
    console.error("Error deleting items:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

exports.AddTransaction = AddTransaction;
exports.GetTransaction = GetTransaction;
exports.GetAllTransactionByDate = GetAllTransactionByDate;
exports.GetAllTransaction = GetAllTransaction;
exports.DeleteInvoice = DeleteInvoice;
