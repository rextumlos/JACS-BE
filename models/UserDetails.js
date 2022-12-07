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

UserDetails.virtual("fullName")
    .get(() => { return `${this.firstName} ${this.lastName}`})
    .set((v) => {
        const firstName = v.substring(0, v.indexOf(" "));
        const lastName = v.substring(v.indexOf(" ") + 1);
        this.set({ firstName, lastName })
    });

UserDetails.plugin(mongoosePaginate);
module.exports = mongoose.model("UserDetails", UserDetails);