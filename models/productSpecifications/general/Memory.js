const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const MemorySchema = new mongoose.Schema({
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
    speed: {
        type: String,
        required: true,
        message: `speed is required.`
    },
    formFactor: {
        type: String,
        required: true,
        message: `formFactor is required.`
    },
    modules: {
        type: String,
        required: true,
        message: `modules is required.`
    },
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        }

    },
    firstWordLatency: {
        type: Number,
        required: true,
        message: `firstWordLatency is required.`
    },
    CASLatency: {
        type: Number,
        required: true,
        message: `CASLatency is required.`
    },
    voltage: {
        type: Number,
        required: true,
        message: `voltage is required.`
    },
    timing: {
        type: String,
        required: true,
        message: `timing is required.`
    },
    ecc_Registered: {
        type: String,
        required: true,
        message: `ecc_Registered is required.`
    },
    heatSpreader: {
        type: Boolean,
        required: true,
        message: `heatSpreader is required.`
    }
},
    { timestamps: true }
)

MemorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Memory", MemorySchema);