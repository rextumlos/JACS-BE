const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const OrderSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        message: "_userId is required.",
    },
    products: [
        {
            _productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Products",
                required: true,
                message: "_productId is required."
            },
            quantity: {
                type: Number,
                default: 1,
            }
        }
    ],
    amount: {
        type: Number,
        required: true,
    },
    address: {
        type: Object,
    },
    details: {
        type: Object,
    },
    status: {
        type: String,
        enum: {
            values: ["PENDING", "PAID", "SHIPPED", "RECEIVED", "CANCELLED"],
            uppercase: true,
        },
        default: "PENDING",
    }
},
    { timestamps: true }
)

OrderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Order", OrderSchema);