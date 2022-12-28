const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MemorySchema = new mongoose.Schema({
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
    speed: {
        type: String,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    modules: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    firstWordLatency: {
        type: Number,
        required: true
    },
    CASLatency: {
        type: Number,
        required: true
    },
    voltage: {
        type: Number,
        required: true
    },
    timing: {
        type: String,
        required: true
    },
    ecc_Registered: {
        type: String,
        required: true
    },
    heatSpreader: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

MemorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Memory", MemorySchema);