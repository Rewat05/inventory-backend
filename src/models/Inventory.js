import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    sku: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    reorderLevel: { type: Number, default: 10 },
    lastSoldAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("Inventory", inventorySchema);
