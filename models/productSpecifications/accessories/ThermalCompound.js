const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ThermalSchema = new mongoose.Schema({
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
    model: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    features: {
        type: [String]
    }
},
    { timestamps: true }
)

ThermalSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Thermal", ThermalSchema);