const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const SoundcardSchema = new mongoose.Schema({
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
    model: {
        type: String,
        required: true,
        message: `model is required.`
    },
    channels: {
        type: [Number],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'channels cannot contain empty strings'
        },
        message: `channels is required.`
    },
    digitalAudio: {
        type: String,
        required: true,
        message: `digitalAudio is required.`
    },
    signalToNoiseRatio: {
        type: Number,
        required: true,
        message: `signalToNoiseRatio is required.`
    },
    sampleRate: {
        type: Number,
        required: true,
        message: `sampleRate is required.`
    },
    chipSet: {
        type: String,
    },
    interface: {
        type: String,
        required: true,
        message: `interface is required.`
    },
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        },
    }
},
    { timestamps: true }
)

SoundcardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Soundcard", SoundcardSchema);