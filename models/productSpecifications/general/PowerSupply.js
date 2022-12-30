const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const PowerSupplySchema = new mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        message: `_productId is required.`
    },
    manufacturer: {
        type: String,
        required: true,
        uppercase: true,
        message: `manufacturer is required.`
    },
    model: {
        type: String,
        required: true,
        message: `model is required.`
    },
    type: {
        type: String,
        required: true,
        message: `type is required.`
    },
    efficiencyRating: {
        type: String,
        required: true,
        message: `efficiencyRating is required.`
    },
    wattage: {
        type: Number,
        required: true,
        message: `wattage is required.`
    },
    length: {
        type: Number,
        required: true,
        message: `length is required.`
    },
    modular: {
        type: Boolean,
        required: true,
        message: `modular is required.`
    },
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        }
    },
    fanless: {
        type: Boolean,
        required: true,
        message: `fanless is required.`
    },
    atx4pinConnectors: {
        type: Number,
        required: true,
        message: `atx4pinConnectors is required.`
    },
    eps8pinConnectors: {
        type: Number,
        required: true,
        message: `eps8pinConnectors is required.`
    },
    pcie12_4pin12VHPWRconnectors: {
        type: Number, 
        required: true,
        message: `pcie12_4pin12VHPWRconnectors is required.`
    },
    pcie12pinConnectors: {
        type: Number, 
        required: true,
        message: `pcie12pinConnectors is required.`
    },
    pcie8pinConnectors: {
        type: Number, 
        required: true,
        message: `pcie8pinConnectors is required.`
    },
    pcie6_2pinConnectors: {
        type: Number, 
        required: true,
        message: `pcie6_2pinConnectors is required.`
    },
    pcie6pinConnectors: {
        type: Number, 
        required: true,
        message: `pcie6pinConnectors is required.`
    },
    sataConnectors: {
        type: Number,
        required: true,
        message: `sataConnectors is required.`
    },
    molex4pinConnectors: {
        type: Number, 
        required: true,
        message: `molex4pinConnectors is required.`
    }
},
    { timestamps: true }
)

PowerSupplySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("PowerSupply", PowerSupplySchema);