const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is required."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required."],
    },
    email: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: true,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    isTech: {
      type: Boolean,
      default: false,
    },
    isDeactivated: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
