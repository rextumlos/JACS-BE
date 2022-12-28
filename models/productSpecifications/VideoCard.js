const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const VideoCardSchema = new mongoose.Schema({
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
    model: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    memory: {
        type: Number,
        required: true,
    },
    coreClock: {
        type: Number,
        required: true
    },
    boostClock: {
        type: Number,
        required: true
    },
    effectiveMemoryClock: {
        type: Number,
        required: true
    },
    interface: {
        type: String,
        required: true
    }, 
    color: {
        type: String,
        required: true
    },
    frameSync: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    TDP: {
        type: Number,
        required: true
    },
    caseExpansionSlotWidth: {
        type: Number,
        required: true
    },
    totalSlotWidth: {
        type: Number,
        required: true
    },
    cooling: {
        type: String,
        required: true
    },
    externalPower: {
        type: String,
        required: true
    },
    hdmiOutputs: {
        type: Number, 
        required: true
    },
    displayPortOutputs: {
        type: Number,
        required: true
    }
},
    { timestamps: true }
)

VideoCardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("VideoCard", VideoCardSchema);