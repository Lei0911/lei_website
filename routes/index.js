const express = require("express");
const router = express.Router();
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // add middleware to protect route
const movieAPIRoute = require("./api/APIs_Route");
const movieSearchRoute = require("./api/APIs_Route");
const movieFavoritesRoute = require("./api/APIs_Route");
// @desc    Login/Landing page
// @route   GET /
router.get("/", ensureGuest, (req, res) => {
    res.render("login");
});

// @desc    Dashboard
// @route   GET /dashboard
router.get("/dashboard", ensureAuth, (req, res) => {
    res.render("dashboard");
});

// @desc    Profile
// @route   GET /Profile
router.get("/profile", ensureAuth, (req, res) => {
    res.render("profile");
});

// @desc    Education
// @route   GET /Education
router.get("/education", ensureAuth, (req, res) => {
    res.render("education");
});

// @desc    Project
// @route   GET /Project
router.get("/project", ensureAuth, (req, res) => {
    res.render("project");
});

// @desc    Contact
// @route   GET /Contact
router.get("/contact", ensureAuth, (req, res) => {
    res.render("contact");
});

// get edu bcit transcript
router.get("/bcitTranscript", ensureAuth, (req, res) => {
    res.render("bcitTranscript");
});

// get edu centennial transcript
router.get("/centennialTranscript", ensureAuth, (req, res) => {
    res.render("centennialTranscript");
});

// get bcit edu detail
router.get("/eduDetail", ensureAuth, (req, res) => {
    res.render("eduDetail");
});
// get centennial edu detail
router.get("/eduDetailCentennial", ensureAuth, (req, res) => {
    res.render("eduDetailCentennial");
});

// @desc    Movie API
// @route   GET /api/movieAPI
router.get("/APIsHome", ensureAuth, (req, res) => {
    res.render("APIsHome");
});

router.get("/movieAPIHome", movieAPIRoute);
router.get("/movieSearch", movieSearchRoute);
router.post("/movieSearch", movieSearchRoute);
router.get("/movieFavorites", movieFavoritesRoute);
router.post("/movieFavorites", movieFavoritesRoute);
router.delete("/movieFavorites", movieFavoritesRoute);

module.exports = router;
