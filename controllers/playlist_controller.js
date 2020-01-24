-- can have many songs
-- can have many subscriptions
CREATE TABLE playlists (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    FOREIGN KEY user_id REFERENCES users(id),
    PRIMARY KEY (id)
);
-- can have many playlists
CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    userName VARCHAR(50),
    email VARCHAR(50),
    userPassword VARCHAR(50),
    PRIMARY KEY (id)
);
-- little baby table. belongs to many 
CREATE TABLE songs (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50),
    artist VARCHAR(50),
    genre VARCHAR(50),
    link VARCHAR(50),
    PRIMARY KEY (id)
);
-- 
CREATE TABLE PlaylistSongs (
    id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY song_id REFERENCES songs(id),
    FOREIGN KEY playlist_id REFERENCES playlists(id),
    PRIMARY KEY (id)
);
CREATE TABLE subscriptions (
    id INT NOT NULL AUTO_INCREMENT,
    FOREIGN KEY user_id REFERENCES users(id),
    FOREIGN KEY playlist_id REFERENCES playlist(id),
    PRIMARY KEY (id)
);

var db = require("../models");

app.get("/", function(req,res) {
    res.render("index");
});

//  Playlist, /api/playlists, GET, READ, Returning JSON data for ALL Playlists and ALL songs on each playlist **




app.get("/api/playlists/:id", function(req, res) {
    db.Playlists.findOne({
        Where: {
            id: req.params.id
        }
    })
    .then(function(dbPlaylist) {
    res.json(dbPlaylist);        
    });
});
// Playlist, /api/playlists/:id, GET, 
// READ, Return JSON data for ONE playlist and ALL songs on that playlist **




app.put("/api/posts", function(req, res) {
    db.Playlists.update(req.body, 
        {
        where: {
            id: req.body.id
        }    
    })
    .then(function(dbPlaylist) {
        res.status(200)
        .end();
    });
}); 
// Playlist, /api/playlists, 
// PUT, UPDATE, Updates playlist based on req.body **





 app.post("/api/playlists", function(req, res) {
     console.log(req.body);
     db.Playlists.create(req.body, 
         {
        Where: {
        playlist: req.body.playlist,
        id: req.body.id
        }     
     })
     .then(function(dbPlaylist) {
         res.status(200)
         .end();
     });
 });
// Playlist, /api/playlists, POST, CREATE, Creates new playlist based on req.body AND creates associations in playlistSongs db **


app.get("/api/users/", function(req, res) {
    console.log(req.body);
    db.Users.findAll({
        include:[db.Playlists]
    })
    .then(function(dbUser) {
        res.json(dbUser);
    });
}); 
// User, /api/users/, GET, READ, Return JSON data for ALL users based on req.body conditions; returns ALL playlists and all songs and for each user as well **


app.get("/api/users/:id", function(req, res) {
    console.log(req.body);
    db.Users.findOne({
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
     db.Subscriptions.findAll({
         where: {
         users: req.body.users
         },
         include: [playlists]
     }).then(function(dbSubscription){
         res.json(dbSubscription);
     });
 });
// Subscription, /api/subscriptions, GET, FIND, Return JSON data for ALL subscriptions based on req.body conditions. Returns the playlist and all songs as well.** 






 app.delete("/api/subscriptions/", function(req, res) {
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





app.get("/api/profile", function(req, res) {
    db.Profile.findAll({
        include: [db.Playlist, db.Subscription]
    }).then(function(dbProfile) {
        res.json(dbProfile);
    });
}); 
// Profile, /profile, GET, READ, Renders a list of all playlists and subscriptions belonging to logged in user. Also shows a list of all users.**




app.get("/profile/:id", function(req, res) {
    db.Profile.read({
        where: {
            id: req.params.id
        },
            include: [db.Playlist, db.Subscriptions] 
    }).then(function(dbProfile) {
        res.json(dbProfile);
    });
}); 
// Profile, /profile/:id, GET, 
// READ, Renders a list of all playlists and subscriptions belonging to user id matching req.params.id **





app.get("/playlist/:id", function(req, res) {
    var query = {};
    if(req.query.id) {
        query.id = req.query.id;
    }
    db.Playlist.findAll({
        where: query
    })
    .then(function(dbPlaylist) {
        res.status(200);
    });
});
// Playlist, /playlist/:id, GET, 
// READ, Displays all the songs on the playlist with given id**





 app.get("/playlist/:id/edit", function(req, res) {
     db.Playlist.findAll({})
         .then(function(dbPlaylist) {
             res.status(200);
         });
 });
// Playlist, /playlist/:id/edit, GET, READ, 
// Displays the edit view for playlist with given id**





// var query = {};
    // if (req.query.playlist_id) {
    //     query.PlaylistId =
    //     req.query.playlist_id
    // }
    // db.Playlists.findAll({
    //     where: query,
    //     include: [db.Songs]
    // }).then(function(dbPlaylist) {
    //     res.json(dbPlaylist); 
    // });

