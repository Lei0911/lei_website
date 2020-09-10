const mongoose = require("mongoose");

const MovieAPISchema = new mongoose.Schema({
    movieTitle: {
        type: String,
        required: true,
    },
    moviePicPath: {
        type: String,
        required: true,
    },
    movieDescription: {
        type: String,
        required: true,
    },
    movieReleaseDate: {
        type: String,
        required: true,
    },
    // favoriteMovie: {
    //     type: Object,
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("MovieAPI", MovieAPISchema);
