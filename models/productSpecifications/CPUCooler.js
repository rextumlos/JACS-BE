const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CPUCoolerSchema = new mongoose.Schema({
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
        required: true
    },
    fanRPM: {
        type: [Number],
        required: true
    },
    noiseLevel: {
        type: [Number],
        required: true
    },
    color: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true,
    },
    cpuSocket: {
        type: [String],
        required: true
    },
    waterCooled: {
        type: Boolean,
        required: true
    },
    fanless: {
        type: Boolean,
        required: true
    }
},
    { timestamps: true }
)

CPUCoolerSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CPUCooler", CPUCoolerSchema);