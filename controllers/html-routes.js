var path = require("path");

// Routes
module.exports = function(app) {

app.get("/", function(req,res) {
    res.render("index");
});
//  Playlist, /api/playlists, GET, READ, Returning JSON data for ALL Playlists and ALL songs on each playlist *

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../index.html"));
  });
// index route if needed?


app.get("/user", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/user.html"));
  });
// user route if needed?


app.get("/playlist", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/playlist.html"));
  });
// playlist route if needed?



app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/profile.html"));
  });
// profile route if needed?


};