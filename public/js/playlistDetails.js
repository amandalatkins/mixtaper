$(document).ready(function() {

    var nameContainer = $('#playlistName');
    var playlistSongs = $('#playlistSongs');

    var searchInput = $('#newSong');
    var searchBtn = $('#addNewSong');

    var playlistId = location.pathname.replace('/playlists/','');

    $.get('/api/playlists/'+playlistId).then(data => {
        nameContainer.text(data.name);
        data.Songs.forEach(song => {
            var songRow = $('<tr>');
            songRow.data(song);
            songRow.append("<td><strong>"+song.title+"</strong></td>");
            songRow.append("<td>"+song.artist+"</td>");
            songRow.append(`<td><a href="${song.link}" target="_blank">Play</a> | <a href="#" class="remove-song" data-id="${song.id}">Remove</a>`);
            playlistSongs.append(songRow);
        });
    });

    $('#searchNewSong').on('click',function() {
        if (searchInput.val() !== "") {
            var queryUrl = '/api/search/'+ searchInput.val().trim();
            $.get(queryUrl, function(data) {
                if (data.length) {
                    console.log(data);
                    renderResults(data);
                } else {
                    alert("No songs match that search.");

                }
            });
        } else {
            alert("You must enter search terms.");
        }
    });

    function renderResults(data) {
        data.forEach(song => {

            var html = "<tr>";
            html += "<td style='width:40%'><strong><a href='";
            html += song.external_urls.spotify;
            html += "' target='_blank'>";
            html += song.name;
            html += "</a></strong></td><td style='width:40%'>";
            html += song.artists[0].name;
            html += "</td><td style='width:20%'>";
            html += `<a class="btn btn-sm btn-secondary" href="${song.external_urls.spotify}" target="_blank">Listen</a>&nbsp;`;
            html += `<a href="#" class='add-song btn btn-sm btn-secondary' data-title='${song.name}' data-artist='${song.artists[0].name}' data-link='${song.external_urls.spotify}'>Add</button>`;
            html += "</td></tr>";

            $('#searchResults').append(html);
            
        });
        
        $('#resultsModal').modal();
    }

    $(document).on('click','.add-song',function(e) {
        e.preventDefault();
        console.log("clicked");
        $.ajax({
            url: '/api/playlists/'+playlistId,
            data: $(this).data(),
            method: "PUT"
        }).then(function() {
            location.reload();
        });
    });

    $(document).on('click','.remove-song',function(e) {
        e.preventDefault();
        var songId = $(this).data('id');
        $.ajax({
            url: "/api/songs/"+songId,
            type: "DELETE"
        }).then(function() {
            location.reload();
        });
    });

});