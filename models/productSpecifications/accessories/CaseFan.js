const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CaseFanSchema = new mongoose.Schema({
    _productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        message: `_productId is required.`
    },
    manufacturer: {
        type: String,
        uppercase: true,
        required: true,
        message: `manufacturer is required.`
    },
    model: {
        type: String,
        required: true,
        message: `model is required.`
    },
    size: {
        type: Number,
        required: true,
        message: `size is required.`
    },
    color: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'color cannot contain empty strings'
        },
    },
    quantity: {
        type: String,
    },
    rpm: {
        type: String,
        required: true,
        message: `rpm is required.`
    },
    airflow: {
        type: Number,
        required: true,
        message: `airflow is required.`
    },
    noiseLevel: {
        type: String,
        required: true,
        message: `noiseLevel is required.`
    },
    pwm: {
        type: Boolean,
        required: true,
        message: `pwm is required.`
    },
    led: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'led cannot contain empty strings'
        },
    },
    connector: {
        type: [String],
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'connector cannot contain empty strings'
        },
    },
    controller: {
        type: String,
        required: true,
        message: `controller is required.`
    },
    staticPressure: {
        type: Number,
        required: true,
        message: `staticPressure is required.`
    }
},
    { timestamps: true }
)

CaseFanSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CaseFan", CaseFanSchema);