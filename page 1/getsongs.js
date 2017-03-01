var songList = [];

function getSongsUrl(artist) {
    return "https://api.musixmatch.com/ws/1.1/track.search?format=jsonp&callback=callback&q_artist=" + artist + "&quorum_factor=1&apikey=902908a8c199f254a1b29d864f9398a4&page_size=30";
};

function requestSongs(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            parseSongs(JSON.parse(xhr.responseText.substring(9, xhr.responseText.length - 2)));
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}

function containsSong(songList , song) {
    for (var i = 0; i < songList .length; i++) {
        if (songList[i] === song) {
            return true;
        }
    }
    return false;
}

function parseSongs(body) {
    var track_list = body.message.body.track_list;
    for (var i = 0; i < track_list.length; i++) {
        var song = track_list[i].track.track_name;
        if (!containsSong(songList , song)) {
            songList.push(song);
        }
    }
}

function getSongList(artist) {
    var url = getSongsUrl(artist);
    requestSongs(url);
    return songList;
}


