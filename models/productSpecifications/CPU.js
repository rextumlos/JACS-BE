const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CPUSchema = new mongoose.Schema({
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
        uppercase: true,
    },
    core: {
        type: Number,
        required: true,
    },
    performanceCoreClock: {
        type: Number,
        required: true
    },
    performanceBoostClock: {
        type: Number,
        required: true
    },
    TDP: {
        type: Number,
        required: true
    },
    series: {
        type: String,
        required: true
    },
    microArchitechture: {
        type: String,
        required: true
    },
    coreFamily: {
        type: String,
        required: true
    },
    socket: {
        type: String,
        required: true
    },
    integratedGraphics: {
        type: String,
        required: true
    },
    maxSupportedMemory: {
        type: Number,
        required: true
    },
    eccSupport: {
        type: Boolean,
        required: true
    }, 
    includesCooler: {
        type: Boolean,
        required: true
    },
    packaging: {
        type: String,
        required: true
    },
    l1Cache: {
        type: [String]
    },
    l2Cache: {
        type: [String]
    },
    l3Cache: {
        type: [String]
    },
    lithography: {
        type: Number
    },
    includesCPUCooler: {
        type: Boolean,
        required: true
    },
    multithreading: {
        type: Boolean,
        required: true
    },
    typeOfMultithreading: {
        type: String
    }
},
    { timestamps: true }
)

CPUSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CPU", CPUSchema);