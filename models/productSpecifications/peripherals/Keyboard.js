const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const KeyboardSchema = new mongoose.Schema({
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
    style: {
        type: String,
        required: true,
    },
    mechanical: {
        type: Boolean,
        required: true,
    },
    switchType: {
        type: String,
    },
    backlit: {
        type: String,
        required: true,
    },
    tenkeyless: {
        type: Boolean,
        required: true,
    },
    connectionType: {
        type: [String],
        required: true,
    },
    color: {
        type: [String],
        required: true,
    },
    mouseIncluded: {
        type: Boolean, 
        required: true,
    },
    features: {
        type: String
    }

},
    { timestamps: true }
)

KeyboardSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Keyboard", KeyboardSchema);