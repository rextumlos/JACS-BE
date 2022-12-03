const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

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
    toJSON: {
      transform: function (doc, ret) {
        delete ret.password;
      }
    }, 
    toObject: {
      transform: function (doc, ret) {
        delete ret.password;
      }
    }
  }
);

UserSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("User", UserSchema);
