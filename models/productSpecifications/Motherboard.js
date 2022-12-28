const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MotherboardSchema = new mongoose.Schema({
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
    socketCpu: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    chipset: {
        type: String,
        required: true
    },
    maxMemory: {
        type: Number,
        required: true
    },
    memoryType: {
        type: String,
        required: true
    },
    memorySlots: {
        type: Number,
        required: true
    },
    memorySpeed: {
        type: [String],
        required: true
    },
    color: {
        type: [String],
        required: true
    },
    sliCrossfire: {
        type: String,
        required: true
    },
    pci16Slots: {
        type: Number,
        required: true
    },
    pci8Slots: {
        type: Number,
        required: true
    },
    pci4Slots: {
        type: Number,
        required: true
    },
    pci1Slots: {
        type: Number,
        required: true
    },
    pciSlots: {
        type: Number,
        required: true
    },
    m2Slots: {
        type: [String],
        required: true
    },
    miniPCIeSlots: {
        type: Number,
        required: true
    },
    halfMiniPCIeSlots: {
        type: Number, 
        required: true
    },
    miniPCIe_mSATASlots: {
        type: Number,
        required: true
    },
    mSataSlots: {
        type: Number,
        required: true,
    },
    sata6Gb: {
        type: Number,
        required: true
    },
    onboardEthernet: {
        type: String,
        required: true
    },
    onboardVideo: {
        type: String,
        required: true
    },
    usb2Headers: {
        type: Number,
        required: true
    },
    singleUsb2Headers: {
        type: Number,
        required: true
    },
    usb3_2Gen1Headers: {
        type: Number,
        required: true
    },
    usb3_2Gen2Headers: {
        type: Number,
        required: true
    },
    usb3_2Gen2x2Headers: {
        type: Number,
        required: true
    },
    supportsECC: {
        type: Boolean,
        required: true
    },
    wirelessNetworking: {
        type: String,
        required: true
    },
    raidSupport: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

MotherboardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Motherboard", MotherboardSchema);