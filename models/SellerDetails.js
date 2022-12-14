const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SellerDetailsSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    storeName: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String
    }
},
    { timestamps: true }
)

SellerDetailsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("SellerDetails", SellerDetailsSchema);