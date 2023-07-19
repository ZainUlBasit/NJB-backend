const Company = require("../Models/Company");

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

exports.AddCompany = AddCompany;
exports.GetAllCompanies = GetAllCompanies;