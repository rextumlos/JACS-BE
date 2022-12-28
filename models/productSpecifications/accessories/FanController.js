const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const FanControlSchema = new mongoose.Schema({
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
        type: Number,
        required: true,
    },
    channelWattage: {
        type: Number,
        required: true,
    },
    pwm4pin: {
        type: Boolean,
        required: true,
    },
    formFactor: {
        type: String,
        required: true,
    },
    features: {
        type: [String]
    },
},
    { timestamps: true }
)

FanControlSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("FanControl", FanControlSchema);