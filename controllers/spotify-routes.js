var db = require("../models");

// Routes
module.exports = function(app) {


app.get("/search/:song", function(req, res) {
    db.Spotify.search({
        where: {
            ?????????
        }
    }).then(function(dbSpotify) {
        res.json(dbSpotify);
    });
});
// Spotify, /search/:song, GET, READ, Searches the spotify api for supplied song and returns JSON data for the results. **


app.get("/search/:song"), function (req, res) {
    db.Spotify.render({
        where: {
            ????????
        }
    }).then(function(dbAuthor) {
        res.json(dbAuthor);
      });
    });
// Index, "/", GET, READ, Renders login/register page is user is NOT logged in. If user IS logged in, redirect to /dashboard **

};

