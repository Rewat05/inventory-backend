import express from "express";
import {
  addItem,
  deleteItem,
  getInventory,
  updateStock,
} from "../controllers/inventoryController.js";

const router = express.Router();

router.post("/", addItem);
router.get("/", getInventory);
router.patch("/:id", updateStock);
router.delete("/:id", deleteItem);

export default router;
