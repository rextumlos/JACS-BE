const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const WirelessNASchema = new mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        message: `_productId is required.`
    },
    manufacturer: {
        type: String,
        required: true,
        message: `manufacturer is required.`
    },
    protocol: {
        type: String,
        required: true,
        message: `protocol is required.`
    },
    interface: {
        type: String,
        required: true,
        message: `interface is required.`
    },
    security: {
        type: String,
        required: true,
        message: `security is required.`
    },
    antenna: {
        type: String,
        required: true,
        message: `antenna is required.`
    },
    features: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'features cannot contain empty strings'
        },
    }
},
    { timestamps: true }
)

WirelessNASchema.plugin(mongoosePaginate);
module.exports = mongoose.model("WirelessNA", WirelessNASchema);