const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const ReviewSchema = new mongoose.Schema({
    _refId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        message: "_refId is required."
    },
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        message: "_userId is required."
    },
    stars: {
        type: Number,
        required: true,
        max: 5,
        message:"stars is required."
    },
    likes: {
        type: Number,
        default: 0,
    },
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    img: {
        type: [String]
    },
    description: {
        type: String,
        required: true,
        message: "description is required."
    }
},
    { timestamps: true }
)

ReviewSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Review", ReviewSchema);