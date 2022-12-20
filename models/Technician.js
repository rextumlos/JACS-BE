const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const TechnicianSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    governId: {
        type: [String],
        required: true,
    },
    certOfTrainings: {
        type: [String],
        required: true,
    }, 
    isApproved: {
        type: String,
        enum: {
            values: ['PENDING', 'APPROVED', 'REJECTED', 'UPDATED'],
            uppercase: true,
        },
        default: 'PENDING',
    }
},
    { timestamps: true }
)

TechnicianSchema.plugin(mongoosePaginate);
module.exports = mongoose.model("Technician", TechnicianSchema);