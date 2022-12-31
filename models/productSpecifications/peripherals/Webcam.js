const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WebcamSchema = new mongoose.Schema({
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
    resolution: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'resolution cannot contain empty strings'
        },
        required: true,
        message: `resolution is required.`
    },
    connection: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'connection cannot contain empty strings'
        },
        required: true,
        message: `connection is required.`
    },
    focusType: {
        type: String,
        required: true,
        message: `focusType is required.`
    },
    operatingSystem: {
        type: [String],
        required: true,
        message: `operatingSystem is required.`
    },
    fovAngle: {
        type: Number,
    },
    fStop: {
        type: Number,
    },
    focalLength: {
        type: Number,
    },
    privacyShutter: {
        type: Boolean
    },
    builtInLightning: {
        type: Boolean,
    },
    automaticLightningAdjust: {
        type: Boolean,
    }
},
    { timestamps: true }
)

WebcamSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Webcam", WebcamSchema);