const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const CryptoJS = require("crypto-js");

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

// Routes
const userRoutes = require("./routes/users");
const productRoutes = require("./routes/products");
const buildRoutes = require("./routes/builds");
const authRoutes = require("./routes/auth");
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

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", buildRoutes);
app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}...`);
});
