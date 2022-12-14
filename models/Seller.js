const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SellerSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    typeOfSeller: {
        type: String,
        enum: {
            values: ['MICRO', 'CORPORATE'],
            uppercase: true,
            message: "Seller type is required. [MICRO, CORPORATE]",
        },
        required: true,
    },
    documents: {
        type: [String],
        required: true,
    },
    isApproved: {
        type: String,
        enum: {
            values: ['PENDING', 'APPROVED', 'REJECTED', 'UPDATED'],
            uppercase: true,
        },
        default: 'PENDING',
    }
},
    { timestamps: true }
)

SellerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Seller", SellerSchema);