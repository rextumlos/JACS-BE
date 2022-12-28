const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WebcamSchema = new mongoose.Schema({
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
    resolution: {
        type: [String],
        required: true,
    },
    connection: {
        type: [String],
        required: true
    },
    focusType: {
        type: String,
        required: true,
    },
    operatingSystem: {
        type: [String],
        required: true,
    },
    fovAngle: {
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