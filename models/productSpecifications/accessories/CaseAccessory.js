const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CaseAccessorySchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true,
    },
    formFactor: {
        type: String,
        required: true,
    },
    features: {
        type: String,
    }
},
    { timestamps: true }
)

CaseAccessorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("CaseAccessory", CaseAccessorySchema);