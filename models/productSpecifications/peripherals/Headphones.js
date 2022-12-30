const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const HeadphonesSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        message: `type is required.`
    },
    frequencyResponse: {
        type: String,
        required: true,
        message: `frequencyResponse is required.`
    },
    microphone: {
        type: Boolean,
        required: true,
        message: `microphone is required.`
    },
    wireless: {
        type: Boolean,
        required: true,
        message: `wireless is required.`
    },
    enclosureType: {
        type: String,
        required: true,
        message: `enclosureType is required.`
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
    activeNoiseCancelling: {
        type: Boolean,
        required: true,
        message: `activeNoiseCancelling is required.`
    },
    connection: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'connection cannot contain empty strings'
        },
    },
    channels: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'channels cannot contain empty strings'
        },
        message: `channels is required.`
    },
    impedance: {
        type: Number,
        required: true,
        message: `impedance is required.`
    },
    sensitivity: {
        type: Number, 
        required: true,
        message: `sensitivity is required.`
    },
    sensitivityAt1VRMS: {
        type: Number, 
    }
},
    { timestamps: true }
)

HeadphonesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Headphones", HeadphonesSchema);