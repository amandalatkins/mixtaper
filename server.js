// Requiring necessary npm packages and node modules
const express = require("express");
const session = require("express-session");
const path = require("path");

// Requiring passport as we've configured it
const passport = require("./app/config/passport.js");

// Setting up port variable
var PORT = process.env.PORT || 3000;

// Setting up Express app
const app = express();

// Setting up various middleware for use in data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use sessions to keep track of our user's login status
app.use(session({ secret: "all your mixtape are belong to us", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

// Require the routes files
// *** NEEDS TO BE UPDATED TO DEXTER'S FILE STRUCTURE
require("./app/routes/api-routes.js")(app);
require("./app/routes/passport-routes.js")(app);
require("./app/routes/html-routes.js")(app);

// Require db models for syncing
const db = require("./app/models");

// Syncing our database via Sequelize, then initalizing the app listening
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);
    });
});