const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MouseSchema = new mongoose.Schema({
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
    model: {
        type: String,
        required: true,
    },
    trackingMethod: {
        type: String,
        required: true,
    },
    connectionType: {
        type: [String],
        required: true,
    },
    maxDPI: {
        type: Number, 
        required: true,
    },
    handOrientation: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
)

MouseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Mouse", MouseSchema);