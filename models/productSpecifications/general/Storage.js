const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const StorageSchema = new mongoose.Schema({
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
    capacity: {
        type: Number,
        required: true,
        message: `capacity is required.`
    },
    type: {
        type: String,
        required: true,
        message: `type is required.`
    },
    cache: {
        type: Number,
        required: true,
        message: `cache is required.`
    },
    formFactor: {
        type: String,
        required: true,
        message: `formFactor is required.`
    },
    interface: {
        type: String,
        required: true,
        message: `interface is required.`
    },
    nvme: {
        type: Boolean,
        required: true,
        message: `nvme is required.`
    }
},
    { timestamps: true }
)

StorageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Storage", StorageSchema);