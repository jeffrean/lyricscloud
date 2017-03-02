var songList = [];


  function requestSongs(artist) {
    $.ajax({
      url: 'https://api.musixmatch.com/ws/1.1/track.search',
      data: {
        q_artist: artist,
        format: 'jsonp',
        quorum_factor: 1,
        apikey: '902908a8c199f254a1b29d864f9398a4',
        page_size: 30,
      },
      dataType: 'jsonp' ,
      jsonp: 'callback',
      success: function (json){
        parseSongs(json);
        getLyricsList(artist, songList);
      },
    });


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
    requestSongs(artist);
}
