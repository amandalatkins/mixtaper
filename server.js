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
require("./app/routes/api-routes.js")(app);
require("./app/routes/passport-routes.js")(app);
require("./app/routes/html-routes.js")(app);

// Require db models for syncing
const db = require("./app/models");

// Syncing our database via Sequelize, then initalizing the app listening
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("==> Listening on port %s. Visit http://localhost:%s/ in your browser.", PORT, PORT);

      // db.User.create({ username: "RonSwanson", password: "demo" }).then(newUser => {
      //   console.log("Created Ron Swanson");

      //   db.User.create({ username: "LeslieKnope", password: "demo"}).then(newUser => { 
      //     console.log("Created Leslie");

      //     db.User.create({ username: "AndyDwyer", password: "demo" }).then(newUser => { 
      //       console.log("Created Andy");
            
      //       db.Playlist.create({ name: "Songs From Great Men About Being Manly", UserId: 1 }).then(newPlaylist => console.log("Created manly songs"));
      //       db.Playlist.create({ name: "Strong Women!", UserId: 2 }).then(newPlaylist => console.log("Created strong women"));
      //       db.Playlist.create({ name: "Waffle Mix", UserId: 2 }).then(newPlaylist => { 
      //         console.log("Created waffle mix");
      //         db.Subscription.create({ UserId: 3, PlaylistId: 3 }).then(newSub => console.log("Created New Subscription"));
      //       });
      //     });

      //     db.Playlist.create({ name: "Mouse Rat Inspo", UserId: 3 }).then(newPlaylist => console.log("Created mouse rat"));

        
      //   });

      // });

      

    });
});