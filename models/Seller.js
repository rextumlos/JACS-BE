const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SellerSchema = new mongoose.Schema({
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
    type: {
        type: String,
        enum: {
            values: ['micro', 'corporate'],
            message: "Type is required. [Micro or Corporate Seller]",
        },
        required: true,
    },
    governId: {
        type: String,
        required: true,
    },
    proofOfBankAccount: {
        type: String,
        required: true,
    },
},
    { timestamps: true }
)

SellerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Seller", SellerSchema);