const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserDetails = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    contactNo: {
        type: Number,
        required: true
    },
    img: {
        type: String,
    },
    address: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    },
    toObject: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret._id;
        },
    }
})


UserDetails.plugin(mongoosePaginate);
module.exports = mongoose.model("UserDetails", UserDetails);