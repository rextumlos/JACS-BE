const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SpeakerSchema = new mongoose.Schema({
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
    configuration: {
        type: String,
        required: true,
    },
    totalWattage: {
        type: Number,
        required: true,
    },
    frequencyResponse: {
        type: String,
        required: true,
    },
    color: {
        type: [String],
    },
    powerEachFront: {
        type: Number,
    },
    powerCenter: {
        type: Number,
    },
    powerEachRear: {
        type: Number,
    },
    powerSubwoofer: {
        type: Number,
    },
    features: {
        type: String
    }
},
    { timestamps: true }
)

SpeakerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Speaker", SpeakerSchema);