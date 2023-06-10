const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CartSchema = new mongoose.Schema({
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
            },
            storeName: {
                type: String
            }
        }
    ]
},
    { timestamps: true }
)

CartSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Cart", CartSchema);