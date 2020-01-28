$(document).ready(function() {
    var nameContainer = $('#playlistName');
    var playlistSongs = $('#playlistSongs');
    var playlistId = location.pathname.replace('/playlists/','');
    $.get('/api/playlists/'+playlistId).then(data => {
        nameContainer.text(data.name);
        data.Songs.forEach(song => {
            var songRow = $('<tr>');
            songRow.data(song);
            songRow.append("<td><strong>"+song.title+"</strong></td>");
            songRow.append("<td>"+song.artist+"</td>");
            songRow.append("<td>"+song.genre+"</td>");
            songRow.append(`<td><a href="${song.link}">Play</a> | <a href="#" class="remove-song" data-id="${song.id}">Remove From Playlist</a>`);
            playlistSongs.append(songRow);
        });
    });
});