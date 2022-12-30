const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UPSSchema = new mongoose.Schema({
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
    capacityW: {
        type: Number,
        required: true,
        message: `capacityW is required.`
    },
    capacityVA: {
        type: Number,
        required: true,
        message: `capacityVA is required.`
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
    dataLineProtection: {
        type:[String],
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
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'receptacles cannot contain empty strings'
        },
    },
    serialPort: {
        type: Boolean,
    },
    waveformType: {
        type: String,
    },
    features: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'features cannot contain empty strings'
        },
    }
},
    { timestamps: true }
)

UPSSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("UPS", UPSSchema);