const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        uppercase: true
    },
    type: {
        type: String,
        required: true,
        enum: {
            values: ["GENERAL", "EXPANSION_CARDS", "PERIPHERALS", "ACCESSORIES/OTHER"],
            message: `type must be one of ["GENERAL", "EXPANSION_CARDS", "PERIPHERALS", "ACCESSORIES/OTHER"]`
        }
    }
},
    { timestamps: true }
)

CategorySchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Category", CategorySchema);