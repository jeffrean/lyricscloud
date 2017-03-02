<?php
	
	//Obtains artists and artist images from spotify.com
	//The obtained data is put into an associative array structure and 
	//encoded into a JSON format

	$artist = $_GET["artist"];
	$url = "https://api.spotify.com/v1/search?q=".$artist."&type=artist";
	
	
	//setting options for cURL transfer
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    $result = curl_exec($ch);
    curl_close($ch);
	
	$json_response = json_decode($result, true);
	
	$artists_json = $json_response['artists']['items'];
	$artists_data = array();
	
	//iterating through artists and putting name and images to the array
	for ($i = 0; $i < count($artists_json); $i++) {
		$artists_images = array();
		$artists_images["name"] = $artists_json[$i]['name'];
		$artists_images["image_url"] = $artists_json[$i]['images'][0]['url'];
		$artists_images["popularity"] = $artists_json[$i]['popularity'];
		
		array_push($artists_data, $artists_images);
	}
	
	//sorting the array by popularity in descending order
	usort($artists_data, function($a, $b) {
		return $b['popularity'] - $a['popularity'];
	});
	
	echo json_encode($artists_data, JSON_UNESCAPED_SLASHES);
	
?>