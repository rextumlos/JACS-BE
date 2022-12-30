const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CaseSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        message: `type is required,`
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
    powerSupply: {
        type: String,
        required: true,
        message: `powerSupply is required.`
    },
    sidePanel: {
        type: String,
        required: true,
        message: `sidePanel is required.`
    },
    powerSupplyShroud: {
        type: Boolean,
        required: true,
        message: `powerSupplyShroud is required.`
    },
    frontPanelUSB: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'frontPanelUSB cannot contain empty strings'
        },
        message: `frontPanelUSB is required.`
    },
    motherboardFormFactor: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'motherboardFormFactor cannot contain empty strings'
        },
        message: `motherboardFormFactor is required.`
    },
    maxLength: {
        type: String,
        required: true,
        message: `maxLength is required.`
    },
    driveBays: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'driveBays cannot contain empty strings'
        },
        message: `driveBays is required.`
    },
    expansionSlots: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'expansionSlots cannot contain empty strings'
        },
        message: `expansionSlots is required.`
    },
    dimensions: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'dimensions cannot contain empty strings'
        },
        message: `dimensions is required.`
    },
    volume: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'volume cannot contain empty strings'
        },
        message: `volume is required.`
    }
},
    { timestamps: true }
)

CaseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Case", CaseSchema);