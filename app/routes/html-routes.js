var path = require("path");

// Routes
module.exports = function(app) {

app.get("/", function(req,res) {
    res.render("index");
});
//  Playlist, /api/playlists, GET, READ, Returning JSON data for ALL Playlists and ALL songs on each playlist *








// // if needed
// app.get("/", function(req, res) {
//     res.sendFile(path.join(__dirname, "../index.html"));
//   });
// // index route?


// app.get("/user", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/user.html"));
//   });
// // user route?


// app.get("/playlist", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/playlist.html"));
//   });
// // playlist route?



// app.get("/profile", function(req, res) {
//     res.sendFile(path.join(__dirname, "../public/profile.html"));
//   });
// // profile route?


};