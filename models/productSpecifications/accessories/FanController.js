const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const FanControlSchema = new mongoose.Schema({
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
    channels: {
        type: Number,
        required: true,
        message: `channels is required.`
    },
    channelWattage: {
        type: Number,
        required: true,
        message: `channelWattage is required.`
    },
    pwm4pin: {
        type: Boolean,
        required: true,
        message: `pwm4pin is required.`
    },
    formFactor: {
        type: String,
        required: true,
        message: `formFactor is required.`
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
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        },
    },
},
    { timestamps: true }
)

FanControlSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("FanControl", FanControlSchema);