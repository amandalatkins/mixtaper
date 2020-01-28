var path = require("path");
var isLoggedIn = require('../config/isLoggedIn.js');

// Routes
module.exports = function(app) {

    app.get('/', (req, res) => {
        if (req.user) {
          res.redirect('/profile');
        } else {
        //   res.sendFile(path.join(__dirname, "../public/index.html"));
          res.sendFile(path.join(__dirname, "../../public/test-login.html"));
        }
    });

    app.get('/profile',isLoggedIn, (req,res) => {
        res.sendFile(path.join(__dirname, "../../public/test-profile.html"));
    });

    app.get("/profile/:id", function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/test-profile.html'));
    }); 

    app.get("/playlists/:id", function(req, res) {
        // res.sendFile(path.join(__dirname, '../../public/playlistDetails.html'));
        res.sendFile(path.join(__dirname,'../../public/test-playlist.html');
    });


};