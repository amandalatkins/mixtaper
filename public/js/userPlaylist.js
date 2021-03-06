$(document).ready(function(){
// Getting references to the playlist input
    var playlistVar = $("#playlist-name");
    var playlistRow = $(".playlist-name")
    var userVar = $("#username-list");

// Adding event listeners to the form to create a new object, and the button to delete
// a playlist
$(document).on("click", "#add-playlist", handleAddPlaylistPress);
$(document).on("click", ".delete-playlist", handleDeletePlaylistPress);

//get user_id global variable
var currentUser = {};

currentUser.id = location.pathname.replace('/profile/','');

if (!isNaN(currentUser.id)) {
  getPlaylists();
} else {
  $.get('/api/user_data', function(CU) {
    console.log(CU);
    currentUser = CU;
    // Getting the initial list of playlists
    getPlaylists();
  });
}


// A function to handle what happens when the form is submitted to create a new playlist
function handleAddPlaylistPress(event){
    event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
if (!playlistVar.val().trim().trim()) {
    return;
}


// Calling the insertPlaylist function and passing in the value of the name input
insertPlaylist({
    userId: currentUser.id,
    name: playlistVar
      .val()
      .trim()
  });
}

  
// A function for creating an pl. Calls getPlaylists upon completion
function insertPlaylist(playlistData) {
    $.post("/api/playlists", playlistData)
    .then(function(){
      location.reload();
    });
  }

// Function for creating a new list row for PLs
function createPlaylistRow(playlistData) {
    var newPl = $("<tr>");
    newPl.data("playlist", playlistData);
    newPl.append("<tr>");
    newPl.append("<td style='color:#fff'>" + playlistData.name + "</td>");
    newPl.append("<td><a href='/playlists/" + playlistData.id + "'>Go to Playlist</a></td>");
    newPl.append("<td><a style='cursor:pointer;color:red' class='delete-playlist' data-id= '"+ playlistData.id + "'><i class='fa fa-window-close fa-2x' aria-hidden='true' style='color:red'></i></a></td>");
    newPl.append("</tr>");
    return newPl;
  }

// Function for retrieving playlists and getting them ready to be rendered to the page
function getPlaylists() {

    var user_id = currentUser.id;

    $.get("/api/users/"+user_id, function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.Playlists.length; i++) {
        rowsToAdd.push(createPlaylistRow(data.Playlists[i]));
      }

      for (var i = 0; i < data.Subscriptions.length; i++) {

        var subPlaylistId = data.Subscriptions[i].PlaylistId;
        var subId = data.Subscriptions[i].id;

        $.get('/api/playlists/'+subPlaylistId).then(data => {

  
          var newPl = $("<tr>");
          newPl.append("<td>" + data.name + "</td>");
          newPl.append("<td><a href='/playlists/" + data.id + "'>Go to Playlist</a></td>");
          newPl.append("<td><a style='cursor:pointer;color:red' class='delete-subscription' data-id= '"+ subId + "'>Unsubscribe</a></td>");

          $('#userSubscriptions').append(newPl);
        });
      }
      
      renderPlaylistList(rowsToAdd);
      playlistVar.val("");
    });
  }
// A function for rendering the list of playlists to the page
function renderPlaylistList(rows) {
    // playlistVar.children().not(":last").remove();
    // playlistVar.children(".alert").remove();
    if (rows.length) {
      playlistRow.prepend(rows);
    }
}

// Function for handling what happens when the delete button is pressed
function handleDeletePlaylistPress() {
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/playlists/" + id
    })
      .then(function(){
        location.reload();
      });

  }


$(document).on('click','.delete-subscription',function(e) {
  e.preventDefault();
    $.ajax({
        url: '/api/subscriptions/'+$(this).data('id'),
        type: 'DELETE'
    }).then(data => {
        location.reload();
    });
});
//__________________________________________________________________________________________________________________
  // function createUserRow(userData) {
  //   var userList = $("<tr>");
  //   userList.data("user", userData);
  //   userList.append("<td>" + userData.name + "</td>");
  //   if (playlistData.Posts) {
  //     userList.append("<td> " + playlistData.Posts.length + "</td>");
  //   } else {
  //     userList.append("<td>0</td>");
  //   }
  //   userList.append("<td><a href='/playlistDetails?playlist_id=" + userData.id + "'>Go to Playlist</a></td>");
  //   userList.append("<td><a href='/cms?playlist_id=" + usertData.id + "'>Create Playlist</a></td>");
  //   userList.append("<td><a style='cursor:pointer;color:red' class='delete-playlist'>Delete Playlist</a></td>");
  //   return userList;
  // }
  

});


//_______________________________________________________________________________________
