const mongoose = require("mongoose");

const MovieAPISchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: false,
    },
    moviePicPath: {
        type: String,
        required: false,
    },
    movieDescription: {
        type: String,
        required: false,
    },
    movieReleaseDate: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MovieAPI", MovieAPISchema);
