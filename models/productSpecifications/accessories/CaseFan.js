const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CaseFanSchema = new mongoose.Schema({
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
    size: {
        type: Number,
        required: true,
    },
    color: {
        type: [String],
    },
    quantity: {
        type: String,
    },
    rpm: {
        type: String,
        required: true,
    },
    airflow: {
        type: Number,
        required: true,
    },
    noiseLevel: {
        type: Number,
        required: true,
    },
    pwm: {
        type: Boolean,
        required: true,
    },
    led: {
        type: [String],
    },
    connector: {
        type: [String],
    },
    controller: {
        type: String,
        required: true,
    },
    staticPressure: {
        type: Number,
        required: true,
    }
},
    { timestamps: true }
)

CaseFanSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CaseFan", CaseFanSchema);