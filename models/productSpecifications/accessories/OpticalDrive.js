const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const OpticalDriveSchema = new mongoose.Schema({
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
    formFactor: {
        type: String,
        required: true,
    },
    interface: {
        type: String,
        required: true,
    },
    bufferCache: {
        type: Number, 
        required: true,
    },
    dvd_romSpeed: {
        type: Number, 
    },
    cd_romSpeed: {
        type: Number,
    },
    bd_rSpeed: {
        type: Number,
    },
    bd_rDualLayerSpeed: {
        type: Number,
    },
    bd_reSpeed: {
        type: Number,
    },
    bd_reDualLayerSpeed: {
        type: Number,
    },
    dvdRSpeed: {
        type: Number,
    },
    dvdRWSpeed: {
        type: Number,
    },
    dvdRDualLayerSpeed: {
        type: Number,
    },
    dvd_rSpeed: {
        type: Number,
    },
    dvd_rwSpeed: {
        type: Number,
    },
    dvd_rDualLayerSpeed: {
        type: Number,
    },
    dvd_ramSpeed: {
        type: Number,
    },
    cd_rSpeed: {
        type: Number,
    },
    cd_rwSpeed: {
        type: Number,
    }
},
    { timestamps: true }
)

OpticalDriveSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("OpticalDrive", OpticalDriveSchema);