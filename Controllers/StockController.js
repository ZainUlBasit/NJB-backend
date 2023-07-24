const Stock = require("../Models/Stock");

const AddStock = async (req, res, next) => {
  let { company_id, name, qty, desc, invoice, truck, date } = req.body;
  let stock;
  date = new Date(date);
  try {
    stock = new Stock({
      company_id,
      name,
      qty,
      desc,
      invoice,
      truck,
      date,
    });
    await stock.save();
    console.log(stock);
  } catch (err) {
    console.log("Error Occured: ", err.message);
  }
  if (!stock) {
    return res.status(500).json({ message: "Unable to Add Stock" });
  }
  return res.status(201).json(stock);
};

const GetAllStocks = async (req, res, next) => {
  let stocks;
  try {
    stocks = await Stock.find();
  } catch (err) {
    console.log(err);
  }

  if (!stocks) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(stocks);
};

exports.AddStock = AddStock;
exports.GetAllStocks = GetAllStocks;
