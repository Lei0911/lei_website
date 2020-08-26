const express = require("express");
const passport = require("passport");
const router = express.Router();
const bcrypt = require("bcrypt");
require("../config/passport_guest")(passport);

// use passport local strategy to login for guest user
const initializePassport = require("../config/passport_guest");
initializePassport(
    passport,
    (username) => users.find((user) => user.username === username),
    (id) => users.find((user) => user.id === id)
);
const users = [];

const { ensureAuth, ensureGuest } = require("../middleware/auth"); // add middleware to protect route

// @route GET / GuestLogin
router.get("/guestLogin", ensureGuest, (req, res) => {
    // console.log(users);
    res.render("guestLogin", {
        user_list: users.reverse(),
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
    })
);

router.get("/registerGuest", ensureGuest, (req, res) => {
    res.render("registerGuest");
});

router.post("/registerGuest", ensureGuest, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        users.push({
            id: Date.now().toString(),
            username: req.body.username,
            password: hashedPassword,
        });
        res.redirect("/guestLogin");
    } catch {
        res.redirect("/registerGuest");
    }
    // console.log(users);
});

module.exports = router;
