const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SoundcardSchema = new mongoose.Schema({
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
    channels: {
        type: [Number],
        required: true,
    },
    digitalAudio: {
        type: String,
        required: true,
    },
    signalToNoiseRatio: {
        type: Number,
        required: true,
    },
    sampleRate: {
        type: Number,
        required: true,
    },
    interface: {
        type: [String],
        required: true,
    },
    color: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
)

SoundcardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Soundcard", SoundcardSchema);