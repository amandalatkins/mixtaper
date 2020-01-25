var db = require("../models");

// Routes
module.exports = function(app) {


    require('dotenv').config();
    const SpotifyAPI = require("node-spotify-api");
    const spotifyKeys = require("../config/spotify");
    const spotify = new SpotifyAPI(spotifyKeys);
    
    app.get('/api/search/:song', function(req,res) {
            spotify.search({ 
                type: 'track', 
                query: req.params.song, 
                limit: 10 
            }, function(err, data) {
                if (err) {
                    console.log(err);
                    res.status(404).end();
                }
                res.json(data.tracks.items);
            });
        });

};

