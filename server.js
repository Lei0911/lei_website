const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan"); // show any http request in console
const exphbs = require("express-handlebars");
const passport = require("passport");
const session = require("express-session");
const connectDB = require("./config/db");
const bcrypt = require("bcrypt");
const flash = require("express-flash");
// const methodOverride = require("method-override");
// Load config
dotenv.config({ path: "./config/config.env" });

// connect MongoDB
connectDB();

const app = express();

// use morgan middleware to monitor request in console
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// Handlebars / default layout is in main.hbs
app.engine(".hbs", exphbs({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".hbs");

//
app.use(express.urlencoded({ extended: false }));
app.use(flash());
// Sessions
app.use(
    session({
        secret: "keyboard cat", // use whatever you want
        resave: false, // false ->we dont want to save session if nothing is modified
        saveUninitialized: false, //false-> dont create a session until something is stored
    })
);
// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes For Guest User Quick access Routes Passport middleware
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/auth_guest"));

// Routes For Google authentication User Passport middleware Passport config
require("./config/passport_google")(passport);
app.use(passport.initialize());
app.use(passport.session());

// app.use("/", require("./routes/auth_guest"));
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.get("/guestLogin", (req, res) => {
    res.render("guestLogin");
});

const PORT = process.env.PORT || 5000;

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);
