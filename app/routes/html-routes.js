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
        res.sendFile(path.join(__dirname, "../../public/userPlaylist.html"));
    });

    app.get("/profile/:id", isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/otherUserPlaylist.html'));
    }); 

    app.get("/playlists/:id", isLoggedIn, function(req, res) {
        res.sendFile(path.join(__dirname, '../../public/playlistDetails.html'));
    });


};