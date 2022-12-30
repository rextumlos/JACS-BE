const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ThermalSchema = new mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        message: `_productId is required.`
    },
    manufacturer: {
        type: String,
        uppercase: true,
        required: true,
        message: `manufacturer is required.`
    },
    model: {
        type: String,
        required: true,
        message: `model is required.`
    },
    amount: {
        type: Number,
        required: true,
        message: `amount is required.`
    },
    features: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'features cannot contain empty strings'
        },
    }
},
    { timestamps: true }
)

ThermalSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Thermal", ThermalSchema);