const express = require("express");
const router = express.Router();
const CompanyController = require("../Controllers/CompanyController");
const ItemController = require("../Controllers/ItemController");

// Company
router.post("/add_company", CompanyController.AddCompany);
router.get("/get_companies", CompanyController.GetAllCompanies);
// Item
router.post("/add_item", ItemController.AddItem);
router.get("/items", ItemController.GetAllItems);

module.exports = router;
