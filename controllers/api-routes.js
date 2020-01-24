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
    .then(function(dbPlaylistSongs) {
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



