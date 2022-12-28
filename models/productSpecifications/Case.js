const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CaseSchema = new mongoose.Schema({
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
    type: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    powerSupply: {
        type: String,
        required: true,
    },
    sidePanel: {
        type: String,
        required: true
    },
    powerSupplyShroud: {
        type: Boolean,
        required: true,
    },
    frontPanelUSB: {
        type: [String],
        required: true,
    },
    motherboardFormFactor: {
        type: [String],
        required: true,
    },
    maxLength: {
        type: String,
        required: true,
    },
    driveBays: {
        type: [String],
        required: true
    },
    expansionSlots: {
        type: String,
        required: true,
    },
    dimensions: {
        type: [String],
        required: true,
    },
    volume: {
        type: [String],
        required: true,
    }
},
    { timestamps: true }
)

CaseSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Case", CaseSchema);