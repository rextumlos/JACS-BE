const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// Routes
const userRoutes = require("./routes/controllers/users");
const productRoutes = require("./routes/controllers/products");
const buildRoutes = require("./routes/controllers/builds");
const authRoutes = require("./routes/utils/auth");
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
        email: "admin@example.com",
        isAdmin: true
      }
    },
    { upsert: true }
  )
    .then(() => console.log("Database connected..."));
});

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/builds", buildRoutes);
app.use("/api/auth", authRoutes);

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}...`);
});
