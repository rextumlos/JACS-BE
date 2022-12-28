const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const OSSchema = new mongoose.Schema({
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
    model: {
        type: String,
        required: true,
    },
    mode: {
        type: String,
        required: true,
    },
    version: {
        type: String,
        required: true,
    },
    maxSupportedMemory: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
)

OSSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("OS", OSSchema);