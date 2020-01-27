$(document).ready(function(){
// Getting references to the playlist input
    var playlistVar = $("#playlist-name");

// Adding event listeners to the form to create a new object, and the button to delete
// a playlist
$(document).on("submit", "#add-playlist", handleAddPlaylistPress);
$(document).on("click", "#delete-playlist", handleDeletePlaylistPress);

// Getting the initial list of playlists
getPlaylists();

// A function to handle what happens when the form is submitted to create a new playlist
function handleAddPlaylistPress(event){
    event.preventDefault();
// Don't do anything if the name fields hasn't been filled out
if (!playlistInput.val().trim().trim()) {
    return;
}


// Calling the insertPlaylist function and passing in the value of the name input
insertPlaylist({
    name: playlistVar
      .val()
      .trim()
  });
}
  
// A function for creating an pl. Calls getPlaylists upon completion
function insertPlaylist(playlistData) {
    $.post("/api/playlists", playlistData)
      .then(getPlaylists);
  }

// Function for creating a new list row for PLs
function createPlaylistRow(playlistData) {
    var newPl = $("<tr>");
    newPl.data("playlist", playlistData);
    newPl.append("<td>" + playlistData.name + "</td>");
    if (playlistData.Posts) {
      newPl.append("<td> " + playlistData.Posts.length + "</td>");
    } else {
      newPl.append("<td>0</td>");
    }
    newPl.append("<td><a href='/playlistDetails?playlist_id=" + playlistData.id + "'>Go to Playlist</a></td>");
    newPl.append("<td><a href='/cms?playlist_id=" + playlistData.id + "'>Create Playlist</a></td>");
    newPl.append("<td><a style='cursor:pointer;color:red' class='delete-playlist'>Delete Playlist</a></td>");
    return newPl;
  }

// Function for retrieving playlists and getting them ready to be rendered to the page
function getPlaylists() {
    $.get("/api/userplaylists", function(data) {
      var rowsToAdd = [];
      for (var i = 0; i < data.length; i++) {
        rowsToAdd.push(createPlaylistRow(data[i]));
      }
      renderPlaylistList(rowsToAdd);
      playlistVar.val("");
    });
  }
// A function for rendering the list of playlists to the page
function renderPlaylistList(rows) {
    authorList.children().not(":last").remove();
    authorContainer.children(".alert").remove();
    if (rows.length) {
      console.log(rows);
      authorList.prepend(rows);
    }

    }
  


// Function for handling what happens when the delete button is pressed
function handleDeletePlaylistPress() {
    var listItemData = $(this).parent("td").parent("tr").data("playlists");
    var id = listItemData.id;
    $.ajax({
      method: "DELETE",
      url: "/api/playlists/" + id
    })
      .then(getPlaylists);
  }
});


//_______________________________________________________________________________________
