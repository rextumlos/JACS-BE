const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// Routes
const userRoutes = require("./routes/users");
const buildRoutes = require("./routes/builds");
const authRoutes = require("./routes/auth");
const sellerRoutes = require("./routes/sellers");
const productRoutes = require("./routes/products");
const technicianRoutes = require("./routes/technicians");
const categoryRoutes = require("./routes/categories");
const cartRoutes = require("./routes/carts");

const User = require("./models/User");

// Database Connection
mongoose.connect(process.env.MONGO_URI);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error..."));
db.once("open", () => {
  User.updateOne(
    { username: "admin" },
    {
      $setOnInsert: {
        password: CryptoJS.AES.encrypt(
          "admin",
          process.env.PASSPHRASE
        ).toString(),
        isAdmin: true
      }
    },
    { upsert: true }
  )
    .then(() => console.log("Database connected..."));
});

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
}));

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", buildRoutes);
app.use("/api", authRoutes);
app.use("/api", sellerRoutes);
app.use("/api", technicianRoutes);
app.use("/api", categoryRoutes);
app.use("/api", cartRoutes);

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}...`);
});
