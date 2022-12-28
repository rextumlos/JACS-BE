const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PowerSupplySchema = new mongoose.Schema({
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
        required: true
    },
    model: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
    },
    efficiencyRating: {
        type: String,
        required: true,
    },
    wattage: {
        type: Number,
        required: true,
    },
    length: {
        type: Number,
        required: true,
    },
    modular: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    fanless: {
        type: Boolean,
        required: true,
    },
    atx4pinConnectors: {
        type: Number,
        required: true,
    },
    eps8pinConnectors: {
        type: Number,
        required: true,
    },
    pcie12_4pin12VHPWRconnectors: {
        type: Number, 
        required: true,
    },
    pcie12pinConnectors: {
        type: Number, 
        required: true,
    },
    pcie8pinConnectors: {
        type: Number, 
        required: true,
    },
    pcie6_2pinConnectors: {
        type: Number, 
        required: true,
    },
    pcie6pinConnectors: {
        type: Number, 
        required: true,
    },
    sataConnectors: {
        type: Number,
        required: true
    },
    molex4pinConnectors: {
        type: Number, 
        required: true,
    }
},
    { timestamps: true }
)

PowerSupplySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PowerSupply", PowerSupplySchema);