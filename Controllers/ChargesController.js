const Charges = require("../Models/Charges");

const AddCharges = async (req, res, next) => {
  let newCharges;
  const { id, cloading, cdelivery, cdiscount, cpaid, advance, total, date } =
    req.body;
  try {
    newCharges = new Charges({
      bill_id: id,
      paid: cpaid,
      loading_charges: cloading,
      delivery_charges: cdelivery,
      discount: cdiscount,
      advance,
      total,
      date,
    });
    await newCharges.save();
  } catch (err) {
    console.log("error: ", err);
  }
  if (!newCharges) {
    return res.status(500).json({ message: "Unable to Add Company" });
  }
  return res.status(201).json({ newCharges });
};

const GetCharges = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  let allChanges;
  try {
    allChanges = await Charges.find({ bill_id: id });
    console.log(allChanges);
  } catch (err) {
    console.log(err);
  }

  if (!allChanges) {
    return res.status(404).json({ message: "No Company Found...." });
  }
  return res.status(200).json(allChanges);
};

exports.AddCharges = AddCharges;
exports.GetCharges = GetCharges;
