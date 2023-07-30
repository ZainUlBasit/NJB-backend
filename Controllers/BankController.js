const Bank = require("../Models/Bank");

const AddBankAccount = async (req, res, next) => {
  const { bankname, accountno } = req.body;
  let newAccount;
  try {
    newAccount = new Bank({
      bankname: bankname,
      accountno: accountno,
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

const GetBankAccounts = async(req,res,next)=>{
    let allAccounts;
    try {
        allAccounts = await Bank.find();
    } catch (err) {
        
    }
}

exports.AddBankAccount = AddBankAccount;
