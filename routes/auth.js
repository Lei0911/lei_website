const express = require("express");
const passport = require("passport");
const router = express.Router();

// @desc    Auth with google
// @route   GET /auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// @desc    Google auth callback
// @route   GET /auth/google/callback
router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

// #desc Logout user
// @route /auth/logout
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

// @desc    Guest Quick Access
// @route   GET /auth/dashboard
router.get(
    "/dashboard",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/dashboard");
    }
);

module.exports = router;
