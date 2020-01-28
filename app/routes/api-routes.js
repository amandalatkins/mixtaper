const passport = require("../config/passport");
require('dotenv').config();
const SpotifyAPI = require("node-spotify-api");
const spotifyKeys = require("../config/spotify");
const spotify = new SpotifyAPI(spotifyKeys);

module.exports = function(app) {

// USER ROUTES
// =========================================================

    // Get all users
    app.get("/api/users/", function(req, res) {
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
        db.User.findById(
            req.params.id,
            { include:[db.Playlist, db.Subscription] }
        ).then(function(dbUser) {
            res.json(dbUser);
        });
    }); 

    // Add a user
    app.post("/api/users/add", function(req, res) {
        db.Users.create({ 
            username: req.body.username,
            password: req.body.password
        }).then(function(dbUser) {
            res.status(200).end();
        });
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
        db.Playlist.findById(
            req.params.id,
            { include: [db.Song] }
        ).then(function(dbPlaylist) {
            res.json(dbPlaylist);        
        });
    });

    // Add song to playlist with given ID
    app.put("/api/playlists/:id", function(req, res) {
        db.Song.create({
            title: req.body.title,
            artist: req.body.artist,
            genre: req.body.genre,
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
        name: req.body.playlistName,
        })
        .then(function(dbPlaylist) {
            res.status(200).end();
        });
    });

    // Delete playlist with given id
    app.delete("/api/playlists/:id", function(req, res) {
        db.Playlist.destroy({
            where: {
                id: req.parms.id
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
            limit: 1
        }, function(err, data) {
            if (err) {
                console.log(err);
                res.status(404).end();
            }
            res.json(data.tracks.items);
        });
    });


};
