import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import inventoryRoutes from "./routes/inventoryRouter.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API running");
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


