const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechnicianSchema = new mongoose.Schema({
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
            values: ['hardware', 'software'],
            message: "Area of expertise is required.",
        },
        required: true,
    },
    levelOfExpertise: {
        type: String,
        enum: {
            values: ['beginner', 'intermediate', 'advanced'],
            message: "Level of expertise is required.",
        },
        required: true,
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
            values: ['online', 'physical'],
            message: "Work setup is required.",
        },
        required: true,
    },
    governId: {
        type: String,
        required: true,
    },
    certOfTrainings: [{
        type: String,
        required: true,
    }],
},
    { timestamps: true }
)

TechnicianSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Technician", TechnicianSchema);