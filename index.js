const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || 8080;
dotenv.config();

mongoose.connect("mongodb://localhost:27017/JACS");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error..."));
db.once("open", () => {
    console.log("Database connected...");
})

app.listen(port, () => {
  console.log(`Server started. Listening on port ${port}...`);
});
