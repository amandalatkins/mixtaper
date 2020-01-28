const db = require("../models");
const passport = require("../config/passport");
const path = require("path");
const isLoggedIn = require('../config/isLoggedIn.js');

module.exports = app => {

    app.post('/api/users/login',passport.authenticate("local"), function(req, res) {
        res.json(req.user);
    });

    app.post("/api/users/register", function(req, res) {
        db.User.create({
          username: req.body.username,
          password: req.body.password
        })
        .then(function() {
            res.redirect(307, "/api/users/login");
        })
        .catch(function(err) {
            console.log(err);
            res.status(401).json(err);
        });
    });

    app.get('/logout', function(req,res) {
      req.logout();
      res.redirect("/");
    });

};