<?php 

	//Obtains song titles and the associated lyrics from MusixMatch.com 
	//The obtained data is put into an associative array structure and 
	//encoded into a JSON format

	$artist = $_GET["artist"];
	
	$songs = array();
	$artist_arr = array();
	
	$api_main_url = "http://api.musixmatch.com/ws/1.1/";
	$api_key = "902908a8c199f254a1b29d864f9398a4";
	
	//url to request song titles and lyrics
	$url_song_titles = $api_main_url."track.search?format=json&q_artist=" . $artist . "&quorum_factor=1&apikey=".$api_key."&page_size=30";
	$url_lyrics = $api_main_url."track.lyrics.get?format=json&apikey=".$api_key."&track_id=";
	
	//obtaining decoded JSON format
	$response = file_get_contents($url_song_titles);
	$json_response = json_decode($response, true);

	$artist_arr["name"] = $artist;
	
	//going through each song titles to request lyrics
	foreach($json_response['message']['body']['track_list'] as $track) {
		//track_id needed to search for lyrics
		$track_id = $track['track']['track_id'];
		
		$lyrics_response = file_get_contents($url_lyrics.$track_id);
		$lyrics_response_decoded = json_decode($lyrics_response, true);
		
		//obtaining lyrics from JSON format
		$lyrics_raw = $lyrics_response_decoded['message']['body']['lyrics']['lyrics_body'];
		$lyrics_trimmed = substr($lyrics_raw,0,strpos($lyrics_raw, '*******'));
		
		$title_final = $track['track']['track_name'];
		$lyrics_final = $lyrics_trimmed;
		
		//creating an array element that contains song title and lyrics
		$song_lyrics_element = array();
		$song_lyrics_element["title"] = $title_final;
		$song_lyrics_element["lyrics"] = $lyrics_final;
		
		array_push($songs, $song_lyrics_element);
	}
	
	$artist_arr["songs"] = $songs;
	
	//encoding the array structure into JSON format
	echo json_encode($artist_arr);
?>