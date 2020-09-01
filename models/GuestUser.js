const mongoose = require("mongoose");

const GuestUserSchema = new mongoose.Schema({
    guestUserName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("GuestUser", GuestUserSchema);
