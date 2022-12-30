const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ProductSchema = new mongoose.Schema({
    _sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Seller",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0
    },
    img: {
        type: [String],
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    sold: {
        type: Number,
        default: 0
    }
},
    { timestamps: true }
)

ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Product", ProductSchema);