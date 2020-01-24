var db = require("../models");

app.get("/", function(req,res) {
    res.render("index");
});

//  Playlist, /api/playlists, GET, READ, Returning JSON data for ALL Playlists and ALL songs on each playlist *