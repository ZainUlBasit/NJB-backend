const express = require("express");
const router = express.Router();
const CompanyController = require("../Controllers/CompanyController");
const ItemController = require("../Controllers/ItemController");
const StockController = require("../Controllers/StockController");
const CustomerController = require("../Controllers/CustomerController");
const CustomerTransactionController = require("../Controllers/CustomerTransactionController");
const BillController = require("../Controllers/BillController");
const ExpenseController = require("../Controllers/ExpenseController");
const TransactionController = require("../Controllers/TransactionController");
const ReturnController = require("../Controllers/CustomerReturnController");
const AuthController = require("../Controllers/authControllers");
const LogOutController = require("../Controllers/LogoutController");
const BankController = require("../Controllers/BankController");
const ChargesController = require("../Controllers/ChargesController")
const User = require("../Models/User");
const bcrypt = require("bcrypt");

// Auth Routes
router.post("/sign-up", AuthController().register);
router.post("/sign-up", AuthController().register);
router.post("/sign-in", AuthController().login);
router.post("/sign-out", LogOutController.Logout);
router.get("/refresh", AuthController().autoLogin);

// Company
router.post("/add_company", CompanyController.AddCompany);
router.get("/get_companies", CompanyController.GetAllCompanies);
router.put("/update-company/:id", CompanyController.UpdateCompany);
router.delete("/delete-company/:id", CompanyController.DeleteCompany);
router.post("/update-company-total", CompanyController.UpdateCompanyTotal);
router.post("/company-cash-legder", CompanyController.ItemLedger);
router.put(
  "/update-company-accounts/:id",
  CompanyController.UpdateCompanyAccounts
);
// Item
router.post("/add_item", ItemController.AddItem);
router.get("/items", ItemController.GetAllItems);
router.put("/update-item/:id", ItemController.UpdateItem);
router.delete("/delete-item/:id", ItemController.DeleteItem);
router.put("/add-stock/:id/:qty", ItemController.AddItemStock);
// Stock
router.post("/stock", StockController.AddStock);
router.get("/all_stock_statistics", StockController.GetAllStocks);
// Customer
router.post("/add-customer", CustomerController.AddCustomer);
router.get("/get-customers", CustomerController.GetAllCustomers);
router.delete("/delete-customer/:id", CustomerController.DeleteCustomer);
router.put("/update-customer/:id", CustomerController.UpdateCustomer);
router.put(
  "/update-customer-total/:id",
  CustomerController.UpdateCustomerTotal
);
router.put(
  "/update-customer-accounts/:id",
  CustomerController.UpdateCustomerAccounts
);
router.patch(
  "/update-customer-advance",
  CustomerController.UpdateCustomerAdvance
);

// Transactions
router.post(
  "/add-customer-transaction",
  CustomerTransactionController.AddTransaction
);
router.post(
  "/get-customer-transaction",
  CustomerTransactionController.GetTransaction
);
router.post(
  "/get-all-customer-by-date-transaction",
  CustomerTransactionController.GetAllTransactionByDate
);
router.post(
  "/get-all-customer-transaction",
  CustomerTransactionController.GetAllTransaction
);
router.delete("/delete-invoice/:id", CustomerTransactionController.DeleteInvoice);
// Charges
router.post("/add-charges", ChargesController.AddCharges)
router.get("/get-charges/:id", ChargesController.GetCharges)


// ********************************************
// Customer Return Items
// ********************************************
router.post("/add-customer-return", ReturnController.AddTransaction);
router.post("/get-customer-return", ReturnController.GetTransaction);
router.post("/get-all-customer-return", ReturnController.GetAllTransaction);

// bill
router.put("/update-bill-no", BillController.updateBillNo);
router.get("/get-bill-no", BillController.getCurrentBill);
// Expenses
router.post("/expenses", ExpenseController.AddExpense);
router.post("/get-expenses", ExpenseController.GetExpense);
// ===============================================
// Payment Routes
// ===============================================
router.post("/add-transaction", TransactionController.AddTransaction);
router.post("/get-transaction", TransactionController.GetTransactions);
router.post("/get-all-transaction", TransactionController.GetAllTransactions);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// ***********************************
// Bank Accounts Routes
// ***********************************
router.post("/add-bank-account", BankController.AddBankAccount);
router.get("/get-bank-accounts", BankController.GetBankAccounts);
router.patch("/update-bank-amount", BankController.UpdateAmount);
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

router.put("/change-password", async (req, res) => {
  console.log(req.body);
  try {
    const { customerId, currentPassword, newPassword } = req.body;

    // Perform any necessary validation checks on the input data
    if (!currentPassword || !newPassword) {
      return res
        .status(400)
        .json({ message: "Current password and new password are required." });
    }

    // Check if the current password matches the stored hashed password for the user
    // Replace this with your own logic to retrieve the user's hashed password from the database
    const user = await User.find({ _id: customerId });
    const storedHashedPassword = user[0].password; // Retrieve the user's hashed password from the database
    console.log(storedHashedPassword);
    const isMatch = await bcrypt.compare(currentPassword, storedHashedPassword);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid current password." });
    }

    // Hash the new password before saving it to the database
    const saltRounds = 10; // You can adjust this value as needed for security
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Save the hashedPassword to the database for the user
    // Replace this with your own logic to update the user's password in the database
    let userWithNewPassword;
    userWithNewPassword = await User.findByIdAndUpdate(
      { _id: customerId },
      {
        $set: {
          password: hashedPassword,
        },
      },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Customer not found" });
        } else {
          return res.status(200).json({ userWithNewPassword });
        }
      }
    );
    return res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    console.error("Error changing password:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
});

module.exports = router;
