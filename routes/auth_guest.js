const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");

require("../config/passport_guest")(passport);
const GuestUser = require("../models/GuestUser");

const users = [];

const { ensureAuth, ensureGuest } = require("../middleware/auth"); // add middleware to protect route

// @route GET / GuestLogin
router.get("/guestLogin", ensureGuest, (req, res) => {
    res.render("guestLogin", {
        errorMessage: req.flash("error"),
        // user_list: users.reverse(),
        totalNumGuests: users.length,
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

router.get("/registerGuest", ensureGuest, (req, res) => {
    res.render("registerGuest");
});

router.post("/registerGuest", ensureGuest, async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const guestUser = new GuestUser({
        guestUserName: req.body.username,
        password: hashedPassword,
    });

    try {
        await guestUser.save((err, savedGuestUser) => {
            if (err) {
                console.log(err);
                res.redirect("/registerGuest");

                // return res.status(500).send();
            } else {
                res.redirect("/guestLogin");
                // console.log(savedGuestUser);
                users.push(JSON.stringify(savedGuestUser));
                // return res.status(200).send();
            }
        });
    } catch {
        res.redirect("/registerGuest");
    }
});

module.exports = router;
