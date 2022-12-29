const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MotherboardSchema = new mongoose.Schema({
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
    socketCpu: {
        type: String,
        required: true,
        message: `socketCpu is required.`
    },
    formFactor: {
        type: String,
        required: true,
        message: `formFactor is required.`
    },
    chipset: {
        type: String,
        required: true,
        message: `chipset is required.`
    },
    maxMemory: {
        type: Number,
        required: true,
        message: `maxMemory is required.`
    },
    memoryType: {
        type: String,
        required: true,
        message: `memoryType is required.`
    },
    memorySlots: {
        type: Number,
        required: true,
        message: `memorySlots is required.`
    },
    memorySpeed: {
        type: [String],
        required: true,
        message: `memorySpeed is required.`,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        }
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
    sliCrossfire: {
        type: String,
        required: true,
        message: `sliCrossfire is required.`
    },
    pci16Slots: {
        type: Number,
        required: true,
        message: `pci16Slots is required.`
    },
    pci8Slots: {
        type: Number,
        required: true,
        message: `pci8Slots is required.`
    },
    pci4Slots: {
        type: Number,
        required: true,
        message: `pci4Slots is required.`
    },
    pci1Slots: {
        type: Number,
        required: true,
        message: `pci1Slots is required.`
    },
    pciSlots: {
        type: Number,
        required: true,
        message: `pciSlots is required.`
    },
    m2Slots: {
        type: [String],
        required: true,
        message: `m2Slots is required.`,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        }
    },
    miniPCIeSlots: {
        type: Number,
        required: true,
        message: `miniPCIeSlots is required.`
    },
    halfMiniPCIeSlots: {
        type: Number, 
        required: true,
        message: `halfMiniPCIeSlots is required.`
    },
    miniPCIe_mSATASlots: {
        type: Number,
        required: true,
        message: `miniPCIe_mSATASlots is required.`
    },
    mSataSlots: {
        type: Number,
        required: true,
        message: `mSataSlots is required.`
    },
    sata6Gb: {
        type: Number,
        required: true,
        message: `sata6Gb is required.`
    },
    onboardEthernet: {
        type: String,
        required: true,
        message: `onboardEthernet is required.`
    },
    onboardVideo: {
        type: String,
        required: true,
        message: `onboardVideo is required.`
    },
    usb2Headers: {
        type: Number,
        required: true,
        message: `usb2Headers is required.`
    },
    singleUsb2Headers: {
        type: Number,
        required: true,
        message: `singleUsb2Headers is required.`
    },
    usb3_2Gen1Headers: {
        type: Number,
        required: true,
        message: `usb3_2Gen1Headers is required.`
    },
    usb3_2Gen2Headers: {
        type: Number,
        required: true,
        message: `usb3_2Gen2Headers is required.`
    },
    usb3_2Gen2x2Headers: {
        type: Number,
        required: true,
        message: `usb3_2Gen2x2Headers is required.`
    },
    supportsECC: {
        type: Boolean,
        required: true,
        message: `supportsECC is required.`
    },
    wirelessNetworking: {
        type: String,
        required: true,
        message: `wirelessNetworking is required.`
    },
    raidSupport: {
        type: Boolean,
        required: true,
        message: `raidSupport is required.`
    }
},
    { timestamps: true }
)

MotherboardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Motherboard", MotherboardSchema);