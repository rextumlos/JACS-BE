const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MonitorSchema = new mongoose.Schema({
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
    screenSize: {
        type: String,
        required: true,
    },
    resolution: {
        type: String,
        required: true,
    },
    refreshRate: {
        type: Number,
        required: true,
    },
    responseTimeG2G: {
        type: Number,
        required: true
    },
    panelType: {
        type: String,
        required: true,
    },
    aspectRatio: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true
    },
    brightness: {
        type: String,
        required: true,
    },
    hdrTier: {
        type: String,
        required: true,
    },
    widescreen: {
        type: Boolean,
        required: true,
    },
    curvedScreen: {
        type: Boolean,
        required: true,
    },
    frameSync: {
        type: String,
        required: true
    },
    builtInSpeakers: {
        type: Boolean,
        required: true,
    },
    viewingAngle: {
        type: String,
        required: true,
    },
    inputs: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
)

MonitorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Monitor", MonitorSchema);