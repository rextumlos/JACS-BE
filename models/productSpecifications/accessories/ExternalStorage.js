const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ExternalStorageSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
    interface: {
        type: String,
        required: true,
    },
    capacity: {
        type: Number,
        required: true,
    },
    color: {
        type: [String]
    }
},
    { timestamps: true }
)

ExternalStorageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ExternalStorage", ExternalStorageSchema);