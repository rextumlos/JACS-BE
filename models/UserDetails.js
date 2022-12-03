const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const UserDetails = new mongoose.Schema({
    userId: {
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
})

UserDetails.plugin(mongoosePaginate);
module.exports = mongoose.model("UserDetails", UserDetails);