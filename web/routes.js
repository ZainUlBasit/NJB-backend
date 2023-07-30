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

// Auth Routes
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
  "/get-all-customer-transaction",
  CustomerTransactionController.GetAllTransaction
);

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
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
module.exports = router;
