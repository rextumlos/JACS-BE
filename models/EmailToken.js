const mongoose = require("mongoose");

const EmailToken = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    token: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        expires: '15m',
        default: Date.now,
    },
})

module.exports = mongoose.model("EmailToken", EmailToken);

