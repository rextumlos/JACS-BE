const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const HeadphonesSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
    frequencyResponse: {
        type: String,
        required: true,
    },
    microphone: {
        type: Boolean,
        required: true,
    },
    wireless: {
        type: Boolean,
        required: true,
    },
    enclosureType: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    activeNoiseCancelling: {
        type: Boolean,
        required: true,
    },
    channels: {
        type: [String],
        required: true,
    },
    impedance: {
        type: Number,
        required: true,
    },
    sensitivity: {
        type: Number, 
        required: true,
    }
},
    { timestamps: true }
)

HeadphonesSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Headphones", HeadphonesSchema);