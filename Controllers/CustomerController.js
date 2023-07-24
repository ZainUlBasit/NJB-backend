const Customer = require("../Models/Customer");

const AddCustomer = async (req, res, next) => {
  const { name, contact, address, cnic } = req.body;
  let customer;
  try {
    customer = new Customer({
      name,
      contact,
      cnic,
      address,
      total: 0,
      remaining: 0,
      paid: 0,
      discount: 0,
    });
    await customer.save();
  } catch (err) {
    console.log("error: ", err);
  }
  if (!customer) {
    return res.status(500).json({ message: "Unable to Add Customer" });
  }
  return res.status(201).json({ customer });
};

const GetAllCustomers = async (req, res, next) => {
  let customers;
  try {
    customers = await Customer.find();
  } catch (err) {
    console.log(err);
  }
  if (!customers) {
    return res.status(404).json({ message: "No Customer Found...." });
  }
  return res.status(200).json(customers);
};

const DeleteCustomer = async (req, res, next) => {
  console.log(req.params);
  const customerId = req.params.id;
  try {
    const delCustomer = await Customer.findByIdAndDelete(customerId);
    if (!customerId) {
      return res.status(400).json({ message: "Bad Request" });
    } else {
      return res.status(201).json({ delCustomer });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const UpdateCustomer = async (req, res, next) => {
  const customerId = req.params.id;
  const { name, contact, cnic, address } = req.body;
  let customer;
  try {
    customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      {
        $set: {
          name,
          contact,
          cnic,
          address,
          total: 0,
          remaining: 0,
          paid: 0,
          discount: 0,
        },
      },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Customer not found" });
        } else {
          return res.status(200).json({ customer });
        }
      }
    );
  } catch (err) {}
};

const UpdateCustomerTotal = async (req, res, next) => {
  const customerId = req.params.id;
  const { total, discount } = req.body;
  let customer;
  try {
    customer = await Customer.findOneAndUpdate(
      { _id: customerId },
      { $inc: { total: total, remaining: total, discount: discount } },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Customer not found" });
        } else {
          return res.status(200).json({ customer });
        }
      }
    );
  } catch (err) {
    console.log("Error Occured", err.message);
  }
};

const UpdateCustomerAccounts = async (req, res, next) => {
  console.log(req.body);
  const { id } = req.params;
  const { amount } = req.body;
  const rem = Number(amount) * -1;
  console.log(id, amount, rem);
  let customer;
  try {
    customer = await Customer.findOneAndUpdate(
      { _id: id },
      { $inc: { remaining: Number(rem), paid: Number(amount) } },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Customer not found" });
        } else {
          return res.status(200).json({ customer });
        }
      }
    );
  } catch (err) {
    console.log("Error Occured:", err.message);
  }
};

exports.AddCustomer = AddCustomer;
exports.GetAllCustomers = GetAllCustomers;
exports.DeleteCustomer = DeleteCustomer;
exports.UpdateCustomer = UpdateCustomer;
exports.UpdateCustomerTotal = UpdateCustomerTotal;
exports.UpdateCustomerAccounts = UpdateCustomerAccounts;
