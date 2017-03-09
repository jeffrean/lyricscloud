// find the song title
function findSongTitle() {
	for(var i = 0; i < artists.length; i++)
	{
		var artist = JSON.parse(artists[i]);
		for(var j = 0; j < artist.songs.length; j++)
		{
			//if this is the same song title as client chosen title, create lyricsSpiltArray
			if(artist.songs[j].title == title)
			{
				//j == index of location of needed title from database storage
				var lyricsSplitArray = createLyricsSplitArray(artist.songs[j].lyrics);
				//Check which words to highlight 
				checkHighlight(lyricsSplitArray); 
			}
		}
	}
}	

//Check which words to highlight 
function checkHighlight(lyricsSplitArray) {
	// for each word, check if we need to highlight
	for (var q = 0; q < lyricsSplitArray.length; q++) {
		var trimmedWord = lyricsSplitArray[q].trim();
		var moreTrimmedWord = word.split(",");
		var newWord = moreTrimmedWord[0];
		if (trimmedWord.toUpperCase() === newWord.toUpperCase()) {
			// highlight chosen word
			$("#lyrics").append("<span style=background-color:#FFFF00>" + trimmedWord + "</span> "); 
		}
		else {
			$("#lyrics").append(trimmedWord + ' '); 
		}
	}
}

//tests checkHighlight by count instead of adding to #lyrics
function checkHighlightTest(lyricsSplitArray, word) {
	// for each word, check if we need to highlight
	var count = 0; 
	for (var q = 0; q < lyricsSplitArray.length; q++) {
		var trimmedWord = lyricsSplitArray[q].trim();
		word = word.trim();
		if (trimmedWord.toUpperCase() === word.toUpperCase()) {
			// highlight chosen word, so add count of picked by 1
			count++;
		}
	}
	return count; 
}

//splits lyrics into individual words to create displayed lyrics to client
function createLyricsSplitArray(lyricsString) {
	lyricsString = lyricsString.replace(/'/gi,"");
	var lyricsSplitArray = lyricsString.split(/,?\s+/); //split by endline

	var fullLyricsSplitArray = [];
	for (var q = 0; q < lyricsSplitArray.length; q++) {
		var splitSubString = lyricsSplitArray[q];
		var spaceSplitSubstringArray = splitSubString.split(" ");
		fullLyricsSplitArray = fullLyricsSplitArray.concat(spaceSplitSubstringArray);
	}
	lyricsSplitArray = fullLyricsSplitArray;
	return lyricsSplitArray; 
}