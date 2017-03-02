<?php 
	$artist = $_GET["artist"];
	$url = "http://api.musixmatch.com/ws/1.1/track.search?format=json&q_artist=" . $artist . "&quorum_factor=1&apikey=902908a8c199f254a1b29d864f9398a4&page_size=30";
	$url_lyrics = "http://api.musixmatch.com/ws/1.1/track.lyrics.get?format=json&apikey=902908a8c199f254a1b29d864f9398a4&track_id=";
	$response = file_get_contents($url);
	$json_response = json_decode($response, true);
	/*print_r($json_response);
	
	for($i = 0; $i < $json_response->message->body->track_list.length; $i++)
	{
		echo $$json_response->message->body->track_list[i]->track_name;
	}
	foreach($json_response->message->body->track_list as $track) {
		echo $track->track->track_name;
	}*/
	
	
	$songs = array();
	$artist_arr = array();

	
	$artist_arr["name"] = $artist;
	//array_push($artist_arr, array("name", $artist));
	
	foreach($json_response['message']['body']['track_list'] as $track) {
		$track_id = $track['track']['track_id'];
		
		$lyrics_response = file_get_contents($url_lyrics.$track_id);
		$lyrics_response_decoded = json_decode($lyrics_response, true);
		
		$lyrics_raw = $lyrics_response_decoded['message']['body']['lyrics']['lyrics_body'];
		$lyrics_trimmed = substr($lyrics_raw,0,strpos($lyrics_raw, '*******'));
		
		$title = $track['track']['track_name'];
		$lyrics = $lyrics_trimmed;
		
		$song_lyrics = array();
		$song_lyrics["title"] = $title;
		$song_lyrics["lyrics"] = $lyrics;
		
		//array_push($songs, array("title", $title));
		//array_push($songs, array("lyrics", $lyrics));
		array_push($songs, $song_lyrics);
		
		//songs += ["songs" => ("title" => $title, "lyrics" => $lyrics)];
	
		
	}
	
	$artist_arr["songs"] = $songs;
	//array_push($artist_arr, array("songs", $songs));
	
	echo json_encode($artist_arr);
	//echo json_encode($artist_arr);
	
	//$artist_data = array();
	//$songs = array();
	
	//foreach($song_names
	
	/*for ($i = 0; $i < count($song_names); $i++) {
		//echo $song_names[$i]."<br>";
		//echo $song_lyrics[$i]."<br><br>";
	}*/
	
	//var_dump($json_response['message']['body']['track_list']);
	
?>