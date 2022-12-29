const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CPUCoolerSchema = new mongoose.Schema({
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
    fanRPM: {
        type: [Number],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'fanRPM cannot contain empty strings'
        },
        message: `fanRPM is required.`
    },
    noiseLevel: {
        type: [Number],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'noiseLevel cannot contain empty strings'
        },
        message: `noiseLevel is required.`
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
    height: {
        type: Number,
        required: true,
        message: `height is required.`
    },
    cpuSocket: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'cpuSocket cannot contain empty strings'
        },
        message: `cpuSocket is required.`
    },
    waterCooled: {
        type: Boolean,
        required: true,
        message: `waterCooled is required.`
    },
    fanless: {
        type: Boolean,
        required: true,
        message: `fanless is required.`
    }
},
    { timestamps: true }
)

CPUCoolerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CPUCooler", CPUCoolerSchema);