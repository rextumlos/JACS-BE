const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MouseSchema = new mongoose.Schema({
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
    trackingMethod: {
        type: String,
        required: true,
        message: `trackingMethod is required.`
    },
    connectionType: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'connectionType cannot contain empty strings'
        },
    },
    maxDPI: {
        type: Number, 
        required: true,
        message: `maxDPI is required.`
    },
    handOrientation: {
        type: String,
        required: true,
        message: `handOrientation is required.`
    },
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        },
    },
    features: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'features cannot contain empty strings'
        },
    },
},
    { timestamps: true }
)

MouseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Mouse", MouseSchema);