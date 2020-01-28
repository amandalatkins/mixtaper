var db = require("../models");

// Routes
module.exports = function(app) {


app.get("/profile", function(req, res) {
    db.Profile.findAll({
        where: {
            id: req.params.id
        },
        include: [db.Playlists, db.Subscriptions]
    }).then(function(dbProfile) {
        res.json(dbProfile);
    });
}); 
// Profile, /profile, GET, READ, Renders a list of all playlists and subscriptions belonging to logged in user. Also shows a list of all users.**


app.get("/profile/:id", function(req, res) {
    db.Profile.findAll({
        where: {
            id: req.params.id
        },
            include: [db.Playlist, db.Subscription] 
    }).then(function(dbProfile) {
        res.json(dbProfile);
    });
}); 
// Profile, /profile/:id, GET, 
// READ, Renders a list of all playlists and subscriptions belonging to user id matching req.params.id **

};