const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MonitorSchema = new mongoose.Schema({
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
    screenSize: {
        type: String,
        required: true,
        message: `screenSize is required.`
    },
    resolution: {
        type: String,
        required: true,
        message: `resolution is required.`
    },
    refreshRate: {
        type: Number,
        required: true,
        message: `refreshRate is required.`
    },
    responseTimeG2G: {
        type: Number,
        required: true,
        message: `responseTimeG2G is required.`
    },
    panelType: {
        type: String,
        required: true,
        message: `panelType is required.`
    },
    aspectRatio: {
        type: String,
        required: true,
        message: `aspectRatio is required.`
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
    brightness: {
        type: String,
        required: true,
        message: `brightness is required.`
    },
    hdrTier: {
        type: String,
        required: true,
        message: `hdrTier is required.`
    },
    widescreen: {
        type: Boolean,
        required: true,
        message: `widescreen is required.`
    },
    curvedScreen: {
        type: Boolean,
        required: true,
        message: `curvedScreen is required.`
    },
    frameSync: {
        type: String,
        required: true,
        message: `frameSync is required.`
    },
    builtInSpeakers: {
        type: Boolean,
        required: true,
        message: `builtInSpeakers is required.`
    },
    viewingAngle: {
        type: String,
        required: true,
        message: `viewingAngle is required.`
    },
    inputs: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'inputs cannot contain empty strings'
        },
        message: `inputs is required.`
    }
},
    { timestamps: true }
)

MonitorSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Monitor", MonitorSchema);