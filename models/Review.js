const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ReviewSchema = new mongoose.Schema({
    _refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    img: {
        type: [String]
    },
    comment: {
        type: String,
        required: true
    }
},
    { timestamps: true }
)

ReviewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Review", ReviewSchema);