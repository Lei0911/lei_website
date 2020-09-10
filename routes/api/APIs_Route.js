const express = require("express");
const router = express.Router();
const movie_db = require("../../config/movie_db");
const MovieAPI = require("../../models/movieAPI");
const bodyParser = require("body-parser");
// use this as a middleware to access console.log post req.body data
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const { ensureAuth, ensureGuest } = require("../../middleware/auth"); // add middleware to protect route
// @desc    movie API
// @route   GET /Profile
router.get("/movieAPIHome", ensureAuth, (req, res) => {
    res.render("movieAPIHome");
});
// const favoriteList = [];
// @desc    movie API Search
// @route   GET /movieSearch
router.get("/movieSearch", ensureAuth, (req, res) => {
    res.render("movieSearch");
});

// @desc    movie API Search
// @route   POST /movieSearch
router.post("/movieSearch", ensureAuth, (req, res) => {
    searchChoice = req.body.searchChoice;
    sortChoice = req.body.sortChoice;
    if (req.body.searchChoice == "Titles") {
        movie_db
            .search(req.body.searchQuery)
            .then((result) => {
                currentSearch = result;
                // console.log(result);
                if (sortChoice == "Titles") {
                    res.render("movieSearch.hbs", {});
                } else {
                    res.render("movieSearch.hbs", {
                        searchResult: currentSearch,
                    });
                }
            })
            .catch((error) => {
                if (error == "No results found for query") {
                    res.render("movieSearch.hbs", {
                        searchQueryErrorMessage: "<h1>" + error + "</h1>",
                    });
                } else if (error == "query must be provided") {
                    res.render("movieSearch.hbs", {
                        searchQueryErrorMessage: "<h1>" + error + "</h1>",
                    });
                } else {
                    res.render("movieSearch", {
                        searchQueryErrorMessage: "<h1>" + error + "</h1>",
                    });
                }
            });
    }
});

// @desc    movie API Search
// @route   GET /movieSearch
// has to use .lean() at the end of find({}).lean() to make sure no own property issues
router.get("/movieFavorites", ensureAuth, async (req, res) => {
    await MovieAPI.find({}, (err, movie) => {
        if (movie.length < 1) {
            res.render("movieFavorites", {
                getFavMovieErrorMessage: "<h1>No Favorite movie saved</h1>",
            });
        } else if (err) {
            console.log(err);
        } else {
            try {
                // get all saved fav movie from schema and then render the save fav movie to fav page, all data on fav page come from here
                console.log("get fav log numbers", movie.length);
                res.render("movieFavorites", {
                    savedFavMovie: movie,
                });
            } catch (error) {
                console.log(error);
            }
        }
    }).lean();
});

// post fav use middleware urlencodedParser to see what's in req.body by console.log
router.post(
    "/movieFavorites",
    urlencodedParser,
    ensureAuth,
    async (req, res) => {
        const movieAPI = new MovieAPI({
            movieTitle: req.body.favTitle,
            moviePicPath: req.body.favImage,
            movieDescription: req.body.favOverview,
            movieReleaseDate: req.body.favReleaseDate,
        });
        try {
            console.log(req.body.currentFavMovieId);
            if (req.body.currentFavMovieId == "") {
                await movieAPI.save((err, savedMovieAPI) => {
                    if (err) {
                        console.log(err);

                        res.redirect("/movieSearch");
                        console.log("save favorite failed");
                    } else {
                        console.log("favorite saved successfully");
                        // console.log("post fav req body is", req.body);
                        // console.log("post fav result is", savedMovieAPI);
                        // console.log(savedMovieAPI._id);
                        res.redirect("movieFavorites");
                    }
                });
            } else {
                try {
                    await MovieAPI.findOneAndDelete(
                        { _id: req.body.currentFavMovieId },
                        (err, deleteRecord) => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect("movieFavorites");
                            }
                        }
                    );
                } catch (error) {
                    console.log(error);
                }
            }
        } catch {
            res.redirect("/movieSearch");
        }
    }
);
module.exports = router;
