var lyrics = [];

    function requestLyrics(artist, currentSong) {
    $.ajax({
      url: 'https://api.musixmatch.com/ws/1.1/matcher.lyrics.get?',
      data: {
        q_track: currentSong,
        q_artist: artist,
        format: 'jsonp',
        apikey: '902908a8c199f254a1b29d864f9398a4',
      },
      dataType: 'jsonp' ,
      jsonp: 'callback',
      success: function (json){
        parseLyrics(json,currentSong);
        callGetLyrics(artist, lyrics);

      },
    });


}

function parseLyrics(body, currentSong) {
        var lyric = body.message.body.lyrics.lyrics_body;
        lyrics.push({
            "title": currentSong,
            "lyrics": lyric.split("*")[0]
        });
}

function getLyricsList(artist, songs) {
    var currentSong;
    for (var i = 0; i < songs.length; i++) {
        currentSong = songs[i];
        requestLyrics(artist, currentSong);
    }
}
