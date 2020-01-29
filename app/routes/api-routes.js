const passport = require("../config/passport");
const db = require("../models");
require('dotenv').config();
const SpotifyAPI = require("node-spotify-api");
const spotifyKeys = require("../config/spotify");
const spotify = new SpotifyAPI(spotifyKeys);

module.exports = function(app) {

// USER ROUTES
// =========================================================

    // Get all users
    app.get("/api/users", function(req, res) {
        console.log(req.body);
        db.User.findAll({
            include: [db.Playlists]
        })
        .then(function(dbUser) {
            res.json(dbUser);
        });
    }); 

    // Get one user by id and their playlists+subscriptions and return JSON
    app.get("/api/users/:id", function(req, res) {
        console.log(req.body);
        db.User.findOne({
            where: { id: req.params.id },
            include:[db.Playlist, db.Subscription] 
        }).then(function(dbUser) {
            res.json(dbUser);
        });
    }); 

    // Add a user
    app.post("/api/users", function(req, res) {
        db.Users.create({ 
            username: req.body.username,
            password: req.body.password
        }).then(function(dbUser) {
            res.status(200).end();
        });
    });

    // Get user data
    app.get('/api/user_data', function(req, res) {
        if (req.user) {
            // The user is not logged in
            res.json(req.user);
        } else {
            res.json({});
        }
    });

// SONG ROUTES
// =========================================================

    // Delete song from playlist
    app.delete("/api/songs/:id", function(req, res) {
        db.Song.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(response) {
            res.status(200).end();
        });
    });


// PLAYLIST ROUTES
// =========================================================

    // Get one playlist by id and all songs from that playlist
    app.get("/api/playlists/:id", function(req, res) {
        db.Playlist.findOne({
            where: { id: req.params.id },
            include: [db.Song] 
        }).then(function(dbPlaylist) {
            res.json(dbPlaylist);        
        });
    });

    // Add song to playlist with given ID
    app.put("/api/playlists/:id", function(req, res) {
        db.Song.create({
            title: req.body.title,
            artist: req.body.artist,
            link: req.body.link 
        })
        .then(function(responseData) {

            db.PlaylistSongs.create({
                SongId: responseData.get('id'),
                PlaylistId: req.params.id
            }).then(function(response){
                res.status(200).end();
            });
        });
    }); 

    // Create new playlist
    app.post("/api/playlists", function(req, res) {
        console.log(req.body);
        db.Playlist.create({
            // *** req.body.NAME needs to match Lucas's key
            name: req.body.name,
            UserId: req.body.userId
        })
        .then(function(dbPlaylist) {
            res.status(200).end();
        });
    });

    // Delete playlist with given id
    app.delete("/api/playlists/:id", function(req, res) {
        db.Playlist.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbPlaylist) {
            res.json(dbPlaylist);
        });
    });


    // SUBSCRIBE ROUTES
    // =========================================================

    app.post("/api/subscriptions/", function(req, res) {
        db.Subscription.create({
            UserId: req.body.userId,
            PlaylistId: req.body.playlistId
        })
        .then(function(dbSubscription) {
            res.json(dbSubscription)
        });
    });

    app.get('/api/subscriptions/:userId/:playlistId', function(req, res) {
        db.Subscription.findOne({ 
            where: { 
                UserId: req.params.userId,
                PlaylistId: req.params.playlistId
            }
        }).then(response => {
            res.json(response);
        });
    });

    app.delete("/api/subscriptions/:id", function(req, res) {
        db.Subscription.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(function(dbSubscription) {
            res.json(dbSubscription)
        });
    });

// SEARCH SPOTIFY
// =========================================================

    // Returns one result from Spotify for a song search
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
