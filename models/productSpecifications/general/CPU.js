const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CPUSchema = new mongoose.Schema({
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
    core: {
        type: Number,
        required: true,
        message: `core is required.`
    },
    performanceCoreClock: {
        type: Number,
        required: true,
        message: `performanceCoreClock is required.`
    },
    performanceBoostClock: {
        type: Number,
        required: true,
        message: `performanceBoostClock is required.`
    },
    TDP: {
        type: Number,
        required: true,
        message: `TDP is required.`
    },
    series: {
        type: String,
        required: true,
        message: `series is required.`
    },
    microArchitechture: {
        type: String,
        required: true,
        message: `microArchitechture is required.`
    },
    coreFamily: {
        type: String,
        required: true,
        message: `coreFamily is required.`
    },
    socket: {
        type: String,
        required: true,
        message: `socket is required.`
    },
    integratedGraphics: {
        type: String,
        required: true,
        message: `integratedGraphics is required.`
    },
    maxSupportedMemory: {
        type: Number,
        required: true,
        message: `maxSupportedMemory is required.`
    },
    eccSupport: {
        type: Boolean,
        required: true,
        message: `eccSupport is required.`
    }, 
    includesCooler: {
        type: Boolean,
        required: true,
        message: `includesCooler is required.`
    },
    packaging: {
        type: String,
        required: true,
        message: `packaging is required.`
    },
    l1Cache: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'l1Cache cannot contain empty strings'
        }
    },
    l2Cache: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'l2Cache cannot contain empty strings'
        }
    },
    l3Cache: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'l3Cache cannot contain empty strings'
        }
    },
    lithography: {
        type: Number
    },
    includesCPUCooler: {
        type: Boolean,
        required: true,
        message: `includesCPUCooler is required.`
    },
    multithreading: {
        type: Boolean,
        required: true,
        message: `multithreading is required.`
    },
    typeOfMultithreading: {
        type: String
    }
},
    { timestamps: true }
)

CPUSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CPU", CPUSchema);