const Company = require("../Models/Company");
const Item = require("../Models/Item");

const AddItem = async (req, res, next) => {
  let item;
  const { name, desc, company, purchase, sale } = req.body;
  try {
    item = new Item({
      name,
      desc,
      company,
      purchase,
      sale,
      qty: 0,
      addeddate: new Date(),
    });
    await item.save();
    console.log(item);
  } catch (err) {
    console.log(err);
  }

  if (!item) {
    return res.status(500).json({ message: "Unable to Add Item" });
  }
  return res.status(201).json(item);
};

const GetAllItems = async (req, res, next) => {
  let items;
  try {
    items = await Item.find();
  } catch (err) {
    console.log(err);
  }

  if (!items) {
    return res.status(404).json({ message: "No Item Found" });
  }
  return res.status(200).json(items);
};

exports.AddItem = AddItem;
exports.GetAllItems = GetAllItems;
