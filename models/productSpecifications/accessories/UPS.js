const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UPSSchema = new mongoose.Schema({
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
    capacityW: {
        type: Number,
        required: true,
    },
    capacityVA: {
        type: Number,
        required: true,
    },
    rackHeight: {
        type: Number,
    },
    backupRunTimeFullLoad: {
        type: Number,
    },
    backupRunTimeHalfLoad: {
        type: Number,
    },
    batteryChemistry: {
        type: String,
    },
    emergencyPowerOff: {
        type: Boolean
    },
    formFactor: {
        type: String,
    },
    hotSwappable: {
        type: Boolean,
    },
    inputVoltage: {
        type: Number,
    },
    maxBatteryRechargeTime: {
        type: Number,
    },
    outputVoltage: {
        type: Number,
    },
    receptacles: {
        type: [String]
    },
    serialPort: {
        type: Boolean,
    }
},
    { timestamps: true }
)

UPSSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("UPS", UPSSchema);