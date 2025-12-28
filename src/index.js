// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./db.js";
// import inventoryRoutes from "./routes/inventoryRouter.js";

// dotenv.config();
// connectDB();

// const app = express();

// app.use(cors());
// app.use(express.json());

// app.use("/api/inventory", inventoryRoutes);

// app.get("/", (req, res) => {
//   res.send("Inventory API running");
// });

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./db.js";
import inventoryRoutes from "./routes/inventoryRouter.js";

dotenv.config();
connectDB();

const app = express();

/* =======================
   ✅ CORS CONFIG (FIX)
   ======================= */
const allowedOrigins = [
  "http://localhost:3000",
  "https://inventory-frontend-47vs5bqw5-rewats-projects-3c066b40.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ REQUIRED for Render / preflight requests
app.options("*", cors());

/* =======================
   MIDDLEWARE
   ======================= */
app.use(express.json());

/* =======================
   ROUTES
   ======================= */
app.use("/api/inventory", inventoryRoutes);

app.get("/", (req, res) => {
  res.send("Inventory API running");
});

/* =======================
   SERVER
   ======================= */
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
