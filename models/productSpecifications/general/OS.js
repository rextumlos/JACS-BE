const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const OSSchema = new mongoose.Schema({
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
    mode: {
        type: String,
        required: true,
        message: `mode is required.`
    },
    version: {
        type: String,
        required: true,
        message: `version is required.`
    },
    maxSupportedMemory: {
        type: Number,
        required: true,
        message: `maxSupportedMemory is required.`
    },
    features: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        }
    }
},
    { timestamps: true }
)

OSSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("OS", OSSchema);