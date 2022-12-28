const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const StorageSchema = new mongoose.Schema({
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
    capacity: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    cache: {
        type: Number,
        required: true
    },
    formFactor: {
        type: String,
        required: true
    },
    interface: {
        type: String,
        required: true
    },
    nvme: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

StorageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Storage", StorageSchema);