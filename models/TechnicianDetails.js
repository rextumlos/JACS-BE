const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechDetailsSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    yearsOfExperience: {
        type: Number,
        required: true,
    },
    areaOfExpertise: {
        type: String,
        enum: {
            values: ['ANY','HARDWARE', 'SOFTWARE', 'NETWORKS'],
            uppercase: true,
            message: "areaOfExpertise must be one of ['ANY','HARDWARE', 'SOFTWARE', 'NETWORKS']",
        },
        required: true,
        message: "areaOfExpertise is required."
    },
    levelOfExpertise: {
        type: String,
        enum: {
            values: ['AMATEUR', 'INTERMEDIATE', 'ADVANCED', 'EXPERTISE'],
            uppercase: true,
            message: "levelOfExpertise must be one of ['AMATEUR', 'INTERMEDIATE', 'ADVANCED', 'EXPERTISE']",
        },
        required: true,
        message: "levelOfExpertise is required."
    },
    email: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    workSetup: {
        type: String,
        enum: {
            values: ['ONLINE', 'PHYSICAL'],
            message: "workSetup must be one of ['ONLINE', 'PHYSICAL']",
        },
        required: true,
        message: "workSetup is required."
    },
    address: {
        type: String
    },
    isEmailConfirmed: {
        type: Boolean,
        default: false
    }
},
    { timestamps: true }
)

TechDetailsSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("TechDetails", TechDetailsSchema);