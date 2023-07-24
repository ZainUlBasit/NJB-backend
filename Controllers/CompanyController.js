const Company = require("../Models/Company");
const Stock = require("../Models/Stock");

const AddCompany = async (req, res, next) => {
  let company;
  const { name, contact, desc, address } = req.body;
  try {
    company = new Company({
      name,
      contact,
      desc,
      address,
      total: 0,
      paid: 0,
      remaining: 0,
    });
    await company.save();
  } catch (err) {
    console.log("error: ", err);
  }
  if (!company) {
    return res.status(500).json({ message: "Unable to Add Company" });
  }
  return res.status(201).json({ company });
};

const GetAllCompanies = async (req, res, next) => {
  let companies;
  try {
    companies = await Company.find();
  } catch (err) {
    console.log(err);
  }

  if (!companies) {
    return res.status(404).json({ message: "No Company Found...." });
  }
  return res.status(200).json(companies);
};

const UpdateCompany = async (req, res, next) => {
  const companyId = req.params.id;
  const { name, contact, desc, address } = req.body;
  let company;
  try {
    company = await Company.findOneAndUpdate(
      { _id: companyId },
      {
        $set: {
          name,
          contact,
          desc,
          address,
        },
      },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Company not found" });
        } else {
          return res.status(200).json({ company });
        }
      }
    );
  } catch (err) {}
};

const DeleteCompany = async (req, res, next) => {
  const companyId = req.params.id;
  try {
    const delCompany = await Company.findByIdAndDelete(companyId);
    if (!companyId) {
      return res.status(400).json({ message: "Bad Request" });
    } else {
      return res.status(201).json({ delCompany });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const UpdateCompanyTotal = async (req, res, next) => {
  const { cTotal, id } = req.body;
  const filter = { _id: id };
  const update = { $inc: { total: cTotal, remaining: cTotal } };
  let company;
  try {
    company = Company.updateOne(filter, update, (err, result) => {
      if (err) {
        console.error("Failed to increment value:", err);
        res.status(500).send("Failed to increment value");
      } else {
        res.send("Value incremented successfully");
      }
    });
  } catch (err) {}
};

const UpdateCompanyAccounts = async (req, res, next) => {
  const { id } = req.params;
  const { amount } = req.body;
  const rem = Number(amount) * -1;
  let company;
  try {
    company = await Company.findOneAndUpdate(
      { _id: id },
      { $inc: { remaining: rem, paid: amount } },
      { new: true },
      (err, data) => {
        if (err) {
          console.log("Error: ",err.message);
        }
        if (data === null) {
          return res.status(404).json({ message: "Company not found" });
        } else {
          return res.status(200).json({ company });
        }
      }
    );
  } catch (err) {
    console.log("Error Occured:", err.message);
  }
};

const ItemLedger = async (req, res, next) => {
  const { id, fromdate, todate } = req.body;
  const startDate = new Date(fromdate);
  const endDate = new Date(todate);
  console.log(req.body);
  let companyCashLedger;
  try {
    companyCashLedger = await Stock.find({
      companyid: id,
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    console.log(companyCashLedger);
  } catch (err) {
    console.log(err);
  }

  if (!companyCashLedger) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(companyCashLedger);
};

exports.AddCompany = AddCompany;
exports.GetAllCompanies = GetAllCompanies;
exports.UpdateCompany = UpdateCompany;
exports.DeleteCompany = DeleteCompany;
exports.UpdateCompanyTotal = UpdateCompanyTotal;
exports.UpdateCompanyAccounts = UpdateCompanyAccounts;
exports.ItemLedger = ItemLedger;
