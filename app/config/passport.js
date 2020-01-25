// Import passport and passport-local packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

// Import the database models
const db = require("../models");

// Use username/email to login via LocalStrategy
passport.use(new LocalStrategy(
    // Informs passport to check the username field in the Users database
    {
        usernameField: "username"
    },
    (username, password, done) => {
        // When a user tries to sign in this code runs
        db.User.findOne({
          where: {
            username: username
          }
        })
        .then(theUser => {
          // If the username search returned no results:
          if (!theUser) {
            return done(null, false, {
              message: "That username doesn't exist!"
            });
          }

          // If the supplied password does not match the one in the db
          else if (!theUser.validPass(password)) {
            return done(null, false, {
              message: "That's not the right password :("
            });
          }
          // Return the user if everything is good to go
          return done(null, theUser);
        });
    }
));

// This keeps the login persistent across all pages/requests of our application
passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

// Export the configured passport
module.exports = passport;