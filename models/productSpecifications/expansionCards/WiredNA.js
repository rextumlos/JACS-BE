const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WiredNASchema = new mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    _categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    manufacturer: {
        type: String,
        required: true,
    },
    interface: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
    },
},
    { timestamps: true }
)

WiredNASchema.plugin(mongoosePaginate);
module.exports = mongoose.model("WiredNA", WiredNASchema);