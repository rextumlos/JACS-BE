const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const VideoCardSchema = new mongoose.Schema({
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
    chipset: {
        type: String,
        required: true,
        message: `chipset is required.`
    },
    memory: {
        type: Number,
        required: true,
        message: `memory is required.`
    },
    coreClock: {
        type: Number,
        required: true,
        message: `coreClock is required.`
    },
    boostClock: {
        type: Number,
        required: true,
        message: `boostClock is required.`
    },
    effectiveMemoryClock: {
        type: Number,
        required: true,
        message: `effectiveMemoryClock is required.`
    },
    interface: {
        type: String,
        required: true,
        message: `interface is required.`
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
    frameSync: {
        type: String,
        required: true,
        message: `frameSync is required.`
    },
    length: {
        type: Number,
        required: true,
        message: `length is required.`
    },
    TDP: {
        type: Number,
        required: true,
        message: `TDP is required.`
    },
    caseExpansionSlotWidth: {
        type: Number,
        required: true,
        message: `caseExpansionSlotWidth is required.`
    },
    totalSlotWidth: {
        type: Number,
        required: true,
        message: `totalSlotWidth is required.`
    },
    cooling: {
        type: String,
        required: true,
        message: `cooling is required.`
    },
    externalPower: {
        type: String,
        required: true,
        message: `externalPower is required.`
    },
    hdmiOutputs: {
        type: Number, 
        required: true,
        message: `hdmiOutputs is required.`
    },
    displayPortOutputs: {
        type: Number,
        required: true,
        message: `displayPortOutputs is required.`
    }
},
    { timestamps: true }
)

VideoCardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("VideoCard", VideoCardSchema);