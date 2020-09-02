const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const GuestUser = require("../models/GuestUser");
const { options } = require("../routes");

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(function (username, password, done) {
            GuestUser.find({ guestUserName: username }, function (err, users) {
                if (users.length > 0) {
                    users.map(async (user) => {
                        if (err) {
                            return done(err);
                        }

                        if (await bcrypt.compare(password, user.password)) {
                            return done(null, user);
                        } else if (
                            !(await bcrypt.compare(password, user.password))
                        ) {
                            // try will catch error users with same name, but don't do anything just let it go to the next username
                            try {
                                return done(null, false, {
                                    message: "Password is incorrect",
                                });
                            } catch (error) {}
                        }
                    });
                } else {
                    // check if username exists
                    return done(null, false, {
                        message: "User is not in Database",
                    });
                }
            });
        })
    );
    passport.serializeUser((user, done) => {
        try {
            return done(null, user.id);
        } catch (error) {
            console.log(error);
        }
    });
    passport.deserializeUser((id, done) => {
        return done(null, id);
    });
};
