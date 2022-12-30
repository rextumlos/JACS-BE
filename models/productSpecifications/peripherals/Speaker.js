const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SpeakerSchema = new mongoose.Schema({
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
    },
    configuration: {
        type: String,
        required: true,
        message: `configuration is required.`
    },
    totalWattage: {
        type: Number,
        required: true,
        message: `totalWattage is required.`
    },
    frequencyResponse: {
        type: String,
        required: true,
        message: `frequencyResponse is required.`
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
    powerEachFront: {
        type: Number,
    },
    powerCenter: {
        type: Number,
    },
    powerEachRear: {
        type: Number,
    },
    powerSubwoofer: {
        type: Number,
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

SpeakerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Speaker", SpeakerSchema);