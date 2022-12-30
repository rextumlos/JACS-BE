const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const KeyboardSchema = new mongoose.Schema({
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
    },
    style: {
        type: String,
        required: true,
        message: `style is required.`
    },
    mechanical: {
        type: Boolean,
        required: true,
        message: `mechanical is required.`
    },
    switchType: {
        type: String,
    },
    backlit: {
        type: String,
        required: true,
        message: `backlit is required.`
    },
    tenkeyless: {
        type: Boolean,
        required: true,
        message: `tenkeyless is required.`
    },
    connectionType: {
        type: [String],
        required: true,
        validate: {
            validator: function (value) {
                return value.every(v => v !== '');
            },
            message: 'connectionType cannot contain empty strings'
        },
        message: `connectionType is required.`
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
    mouseIncluded: {
        type: Boolean, 
        required: true,
        message: `mouseIncluded is required.`
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

KeyboardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Keyboard", KeyboardSchema);