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

const UpdateItem = async (req, res, next) => {
  const itemId = req.params.id;
  const { name, desc, company, purchase, sale } = req.body;
  let item;
  try {
    item = await Item.findOneAndUpdate(
      { _id: itemId },
      {
        $set: {
          name,
          desc,
          company,
          purchase,
          sale,
        },
      },
      { new: true },
      (err, data) => {
        if (data === null) {
          return res.status(404).json({ message: "Item not found" });
        } else {
          return res.status(200).json({ item });
        }
      }
    );
  } catch (err) {
    console.log("Error Occured: ", err.message);
  }
};

const DeleteItem = async (req, res, next) => {
  const itemId = req.params.id;
  try {
    const delItem = await Item.findByIdAndDelete(itemId);
    if (!itemId) {
      return res.status(400).json({ message: "Bad Request" });
    } else {
      return res.status(201).json({ delItem });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

const AddItemStock = async (req, res, next) => {
  const itemId = req.params.id;
  const newqty = req.params.qty;
  let item;
  const filter = { _id: itemId };
  const update = { $inc: { qty: newqty } };
  try {
    item = await Item.updateOne(filter, update, (err, result) => {
      if (err) {
        console.error("Failed to increment value:", err);
        res.status(500).send("Failed to increment value");
      } else {
        res.send("Value incremented successfully");
      }
    });
  } catch (err) {
    console.log("Error Occured: ", err.message);
  }
};

exports.AddItem = AddItem;
exports.GetAllItems = GetAllItems;
exports.UpdateItem = UpdateItem;
exports.DeleteItem = DeleteItem;
exports.AddItemStock = AddItemStock;
