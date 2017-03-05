<?php

	//Obtains song titles and the associated lyrics from MusixMatch.com
	//The obtained data is put into an associative array structure and
	//encoded into a JSON format
	
	function getTracksJSONFormatDecoded($url_song_titles) {
		$response = file_get_contents($url_song_titles);
		$json_response = json_decode($response, true);
		return $json_response;
	}
	
	function createTrackIDArray($json_response) {
		$track_list = $json_response['message']['body']['track_list'];
		$track_ids = array();
		
		for($i=0; $i<count($track_list); $i++) {
			$track_id = $track_list[$i]['track']['track_id'];
			array_push($track_ids, $track_id);
		}
		return $track_ids;
	}
	
	function createTrackNameArray($json_response) {
		$track_list = $json_response['message']['body']['track_list'];
		$track_names = array();
		
		for($i=0; $i<count($track_list); $i++) {
			$track_name = $track_list[$i]['track']['track_name'];
			array_push($track_names, $track_name);
		}
		return $track_names;
	}
	
	function createLyricsArray($track_ids, $url_lyrics) {
		$lyrics_arr = array();
	
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_HEADER, false);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); 
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
		for ($i=0; $i<count($track_ids); $i++) {
			curl_setopt($ch, CURLOPT_URL, $url_lyrics.$track_ids[$i]);
			$lyrics_response = curl_exec($ch);
			$lyrics_response_decoded = json_decode($lyrics_response, true);
			$lyrics_raw = $lyrics_response_decoded['message']['body']['lyrics']['lyrics_body'];
			$lyrics_trimmed = substr($lyrics_raw,0,strpos($lyrics_raw, '*******'));
			array_push($lyrics_arr, $lyrics_trimmed);
		}
		curl_close($ch);
		
		return $lyrics_arr;
	}
	
	function createTitleLyricsArray($track_names, $lyrics_arr) {
		$songs = array();
		for ($i=0;$i<count($track_names);$i++) {
			$title = $track_names[$i];
			$lyrics = $lyrics_arr[$i];
		
			//creating an array element that contains song title and lyrics
			$song_lyrics_element = array();
			$song_lyrics_element["title"] = $title;
			$song_lyrics_element["lyrics"] = $lyrics;

			array_push($songs, $song_lyrics_element);
		}
		return $songs;
	}
	
	function createMasterArray($songs, $arist) {
		$artist_arr = array();
		$artist_arr["name"] = $artist;
		$artist_arr["songs"] = $songs;
		return $artist_arr;
	}	
	
	
	$artist = $_GET["artist"];
	
	$api_main_url = "http://api.musixmatch.com/ws/1.1/";
	//$api_key = "7715b02c13eabfd0757751cff37665a2";
	//$api_key = "902908a8c199f254a1b29d864f9398a4";
	$api_key = "83149e0ddfd90f54291c06d42808d653";

	//url to request song titles and lyrics
	$url_song_titles = $api_main_url."track.search?format=json&q_artist=" . $artist . "&quorum_factor=1&apikey=".$api_key."&page_size=30";
	$url_lyrics = $api_main_url."track.lyrics.get?format=json&apikey=".$api_key."&track_id=";

	$json_response = getTracksJSONFormatDecoded($url_song_titles);
	$track_ids = createTrackIDArray($json_response);
	$track_names = createTrackNameArray($json_response);
	$lyrics_arr = createLyricsArray($track_ids, $url_lyrics);
	$songs = createTitleLyricsArray($track_names, $lyrics_arr);
	$artist_arr = createMasterArray($songs, $artist);

	echo json_encode($artist_arr);

	
?>
