var path = require("path");
var isLoggedIn = require('../config/isLoggedIn.js');

// Routes
module.exports = function(app) {

    app.get('/', (req, res) => {
        if (req.user) {
          res.redirect('/profile');
        } else {
          res.sendFile(path.join(__dirname, "../public/index.html"));
        }
    });

    app.get('/profile',isLoggedIn, (req,res) => {
        res.sendFile(path.join(__dirname, "../public/profile.html"));
    });

    app.get("/profile/:id", function(req, res) {
        res.sendFile(path.join(__dirname, '../public/profile.html'));
    }); 

    app.get("/playlist/:id", function(req, res) {
        res.sendFile(path.join(__dirname, '../public/playlistDetails.html'));
    });


};