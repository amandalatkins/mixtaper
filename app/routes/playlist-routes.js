var db = require("../models");

// Routes
module.exports = function(app) {


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
// Displays the edit view for playlist with given id*

};