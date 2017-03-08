//counts appearance of word in the current song and pushes the song onto songs if has count > 0
function countSongs(songs) {
	for(var i = 0; i < artists.length; i++)
	{
		var artist = JSON.parse(artists[i]);
		for(var j = 0; j < artist.songs.length; j++)
		{
			var artist_lyrics = artist.songs[j].lyrics + ' ';
			artist_lyrics = artist_lyrics.replace(/'/gi,"");
			var count = (artist_lyrics.match(new RegExp(word + ' ', "gi")) || []).length;
			count += (artist_lyrics.match(new RegExp(word + ',', "gi")) || []).length;
			count += (artist_lyrics.match(new RegExp(word + '\n', "gi")) || []).length;
			count += (artist_lyrics.match(new RegExp(word + '\r', "gi")) || []).length;
			if(count > 0)
			{
				songs.push( {song: artist.songs[j].title,
								artist: artist.name,
								count: count});
			}
		}
	}
	return songs; 
}

//sort Songs by frequency of word appearance 
function sortSongs(songs) {
	songs.sort(function (a, b) {
		if (a.count === b.count) {
			return 0;
		}
		else {
			return (a.count < b.count) ? 1 : -1;
		}
	});
}

//sets Song List and necessary word count to each song
function setSongList(songs) {
	localStorage.setItem("songsList", JSON.stringify(songs));
	$("#lyrics").append("<ul></ul>");
	for(var i in songs) {
		var li = "<li>";
		$("#lyrics").append(li.concat(songs[i].song + " (" + songs[i].count) + ')')
	}
}