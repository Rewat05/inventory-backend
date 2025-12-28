import Inventory from "../models/Inventory.js";

export const addItem = async (req, res) => {
  try {
    const item = await Inventory.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const getInventory = async (req, res) => {
  try {
    const items = await Inventory.find();

    const today = new Date();

    const data = items.map((item) => {
      let status = "FAST";

      if (!item.lastSoldAt) status = "DEAD";
      else {
        const days = (today - item.lastSoldAt) / (1000 * 60 * 60 * 24);

        if (days > 60) status = "DEAD";
        else if (days > 30) status = "SLOW";
      }

      return {
        ...item.toObject(),
        status,
        lowStock: item.quantity < item.reorderLevel,
      };
    });

    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateStock = async (req, res) => {
  try {
    const { quantityChange } = req.body;

    if (typeof quantityChange !== "number") {
      return res
        .status(400)
        .json({ message: "quantityChange must be a number" });
    }

    const item = await Inventory.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    item.quantity += quantityChange;

    item.quantity = Math.max(0, item.quantity);

    if (quantityChange < 0) {
      item.lastSoldAt = new Date();
    }

    await item.save();
    res.json(item);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteItem = async (req, res) => {
  try {
    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
