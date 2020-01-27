const passport = require("../config/passport") 

// Routes
module.exports = function(app) {


app.post("/api/users/add", function(req, res) {
    db.Users.create(req.body).then(function(dbUser) {
        res.status(200).end();
    });
});
// User, /api/users/add, POST, CREATE, Creates a new user and returns status(200) on success



// app.get("/api/users/login", 
//     passport.authenticate("local"),
//         function(req, res) {
//         res.json(req.user);
//     });
// User, /api/users/login, GET, FIND, Uses Passpost to authenticate user against the database and serialize. Redirects user to /profile on success. Alerts the user on failure.



app.get("/api/playlists/:id", function(req, res) {
    db.Playlist.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(function(dbPlaylist) {
    res.json(dbPlaylist);        
    });
});
// Playlist, /api/playlists/:id, GET, 
// READ, Return JSON data for ONE playlist and ALL songs on that playlist **



app.put("/api/playlists/:id", function(req, res) {
    db.Song.create({
        title: req.body.title,
        artist: req.body.artist,
        genre: req.body.genre,
        link: req.body.link 
    })
    .then(function(responseData) {

        db.PlaylistSongs.create({
            songId: responseData.insertId,
            playlistId: req.params.id
        }).then(function(response){
        res.status(200)
        .end();
    });
}); 
// Playlist, /api/playlists, 
// PUT, UPDATE, Updates playlist based on req.body **

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
// delete playlist

app.delete("/api/playlists/:playlistId/song/:songId", function(req, res) {
    db.PlaylistSongs.destroy({
            where: {
                SongId: req.params.songId,
                PlaylistId: req.params.playlistId
            }
        }).then(function(responseData) {
    db.Song.destroy({
        where: {
            id: req.params.songId
        }
            }).then(function(response) {
        res.status(200).end();
    });
   });
// delete songs /api/playlists/:playlistId/song/:songId


app.post("/api/playlists", function(req, res) {
    console.log(req.body);
    db.Playlist.create({
       Where: {
       playlist: req.body.playlist,
       id: req.body.id
       },
           include:[db.PlaylistSongs]     
    })
    .then(function(dbPlaylist) {
        res.status(200)
        .end();
    });
});
// Playlist, /api/playlists, POST, CREATE, Creates new playlist based on req.body AND creates associations in playlistSongs db **



app.get("/api/users/", function(req, res) {
    console.log(req.body);
    db.User.findAll({
        where: {
            id: req.body.id
        },
        include:[db.Playlists]
    })
    .then(function(dbUser) {
        res.json(dbUser);
    });
}); 
// User, /api/users/, GET, READ, Return JSON data for ALL users based on req.body conditions; returns ALL playlists and all songs and for each user as well **



app.get("/api/users/:id", function(req, res) {
    console.log(req.body);
    db.User.findOne({
        where: {
            id: req.params.id
        },
        include:[db.Playlist]
    }).then(function(dbUser) {
        res.json(dbUser);
    });
}); 
// User, /api/users/:id, GET, READ, Return JSON data for ONE user and all their playlists and all songs for each playlist **


app.get("/api/subscriptions", function(req, res) {
    db.Subscription.findAll({
        where: {
        id: req.body.id
        },
        include: [playlists]
    }).then(function(dbSubscription){
        res.json(dbSubscription);
    });
});
// Subscription, /api/subscriptions, GET, FIND, Return JSON data for ALL subscriptions based on req.body conditions. Returns the playlist and all songs as well.**


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
// Subscription, /api/subscriptions/:id, DELETE, DESTROY, Deletes a subscription associated with req.params.id.**


};
