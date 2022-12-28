const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WirelessNASchema = new mongoose.Schema({
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
    protocol: {
        type: String,
        required: true,
    },
    interface: {
        type: [String],
        required: true,
    },
    security: {
        type: String,
        required: true,
    },
    antenna: {
        type: String,
        required: true,
    },
    features: {
        type: [String],
    }
},
    { timestamps: true }
)

WirelessNASchema.plugin(mongoosePaginate);
module.exports = mongoose.model("WirelessNA", WirelessNASchema);