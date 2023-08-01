const Bank = require("../Models/Bank");

const AddBankAccount = async (req, res, next) => {
  const { bankname, accountno } = req.body;
  let newAccount;
  try {
    newAccount = new Bank({
      bankname: bankname,
      accountno: accountno,
      amount: 0,
    });
    await newAccount.save();
  } catch (err) {
    console.log("Error Occured: ", err);
  }
  if (!newAccount) {
    return res.status(500).json({ message: "Unable to Add Bank Account" });
  }
  return res.status(201).json({ newAccount });
};

const GetBankAccounts = async (req, res, next) => {
  let allAccounts;
  try {
    allAccounts = await Bank.find();
  } catch (err) {
    console.log(err);
  }

  if (!allAccounts) {
    return res.status(404).json({ message: "No Account Found...." });
  }
  return res.status(200).json(allAccounts);
};

const UpdateAmount = async (req, res, next) => {
  const { id, newAmount } = req.body;
  let bankaccount;
  try {
    bankaccount = await Bank.findOneAndUpdate(
      { _id: id },
      {
        $inc: {
          amount: newAmount,
        },
      },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Bank Account not found" });
        } else {
          return res.status(200).json({ bankaccount });
        }
      }
    );
  } catch (err) {
    console.log("Error Occured", err.message);
  }
};

exports.AddBankAccount = AddBankAccount;
exports.GetBankAccounts = GetBankAccounts;
exports.UpdateAmount = UpdateAmount;
