const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");
var confirmationError = "";

require("../config/passport_guest")(passport);
const GuestUser = require("../models/GuestUser");

const { ensureAuth, ensureGuest } = require("../middleware/auth"); // add middleware to protect route

// @route GET / GuestLogin
router.get("/guestLogin", ensureGuest, async (req, res) => {
    const totalGuest = await GuestUser.countDocuments({});
    res.render("guestLogin", {
        errorMessage: req.flash("error"),
        totalNumGuests: totalGuest,
    });
});

router.post(
    "/guestLogin",
    ensureGuest,
    passport.authenticate("local", {
        successRedirect: "/dashboard",
        failureRedirect: "/guestLogin",
        failureFlash: true,
        // failureFlash: "Invalid username or password.",
    })
);

router.get("/registerGuest", ensureGuest, async (req, res) => {
    const totalGuest = await GuestUser.countDocuments({});
    res.render("registerGuest", {
        errorMessage: req.flash("error"),
        totalNumGuests: totalGuest,
        errorMessage_confirmation: confirmationError,
    });
});

router.post("/registerGuest", ensureGuest, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const guestUser = new GuestUser({
        guestUserName: req.body.username,
        password: hashedPassword,
    });
    try {
        if (!req.body.username.match("^[a-zA-Z0-9_]+$")) {
            console.log("Wrong username type");
            res.redirect("/registerGuest");
        }
        if (req.body.password != req.body.confirm_password) {
            confirmationError = "Passwords typed don't match";
            res.redirect("/registerGuest");
        } else {
            await guestUser.save((err, savedGuestUser) => {
                if (err) {
                    console.log(err);
                    res.redirect("/registerGuest");
                    // return res.status(500).send();
                } else {
                    res.redirect("/guestLogin");
                    // return res.status(200).send();
                }
            });
        }
    } catch {
        res.redirect("/registerGuest");
    }
});

module.exports = router;
