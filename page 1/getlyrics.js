var lyrics = [];

function getLyricsUrl(artist, song) {
    return "https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?format=jsonp&callback=callback&q_track=" + song + "&q_artist=" + artist + "&apikey=902908a8c199f254a1b29d864f9398a4";
}

function requestLyrics(url, currentSong) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            parseLyrics(JSON.parse(xhr.responseText.substring(9, xhr.responseText.length - 2)), currentSong);
        }
    }
    xhr.open('GET', url, true);
    xhr.send(null);
}

function parseLyrics(body, currentSong) {
        var lyric = body.message.body.lyrics.lyrics_body;
        lyrics.push({
            "title": currentSong,
            "lyrics": lyric.split("*")[0]
        });
        console.log(lyrics);
}

function getLyricsList(artist, songs) {
    var currentSong;
    for (var i = 0; i < songs.length; i++) {
        currentSong = songs[i];
        requestLyrics(getLyricsUrl(artist, currentSong), currentSong);
    }

    setTimeout(function(){}, 1000);
    return lyrics;
}