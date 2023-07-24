const BillNo = require("../Models/Billno");

const updateBillNo = async (req, res, next) => {
  let billno;
  try {
    const billFilter = {};
    const billUpdate = { $inc: { billno: 1 } };
    billno = BillNo.updateMany(billFilter, billUpdate, (err, result) => {
      if (err) {
        console.error("Failed to increment value:", err);
        res.status(500).send("Failed to increment value");
      } else {
        res.send("Bill number incremented...!");
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getCurrentBill = async (req, res, next) => {
  let billno;
  try {
    billno = await BillNo.find();
  } catch (err) {
    console.log(err);
  }

  if (!billno) {
    return res.status(404).json({ message: "No Bill no found...!" });
  }
  return res.status(200).json(billno[0].billno);
};

exports.updateBillNo = updateBillNo;
exports.getCurrentBill = getCurrentBill;
