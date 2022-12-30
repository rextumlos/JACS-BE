const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ExternalStorageSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
        message: `type is required.`
    },
    interface: {
        type: String,
        required: true,
        message: `interface is required.`
    },
    capacity: {
        type: Number,
        required: true,
        message: `capacity is required.`
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
    rpm : {
        type: Number,
    }
},
    { timestamps: true }
)

ExternalStorageSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("ExternalStorage", ExternalStorageSchema);