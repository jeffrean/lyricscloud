<?php 
	$artist = $_GET["artist"];
	$url = "https://api.spotify.com/v1/search?q=".$artist."&type=artist";
	
	$ch = curl_init();
    curl_setopt($ch, CURLOPT_HEADER, false);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 1); 
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
    $result = curl_exec($ch);
    curl_close($ch);
	
	
	//$response = file_get_contents($ch);
	$json_response = json_decode($result, true);
	//var_dump($json_response['artists']['items'][0]['images'][0]['url']);
	
	$artists_json = $json_response['artists']['items'];
	
	$artists_data = array();
	
	
	for ($i =0; $i < count($artists_json); $i++) {
		$artists_images = array();
		$artists_images["name"] = $artists_json[$i]['name'];
		$artists_images["url"] = $artists_json[$i]['images'][0]['url'];
		$artists_images["popularity"] = $artists_json[$i]['popularity'];
		
		array_push($artists_data, $artists_images);
	}
	
	usort($artists_data, function($a, $b) {
		return $b['popularity'] - $a['popularity'];
	});
	
	
	echo json_encode($artists_data, JSON_UNESCAPED_SLASHES);
	//console.log($json_response);
	
	/*foreach ($json_response['artists']['items']['images'] as $images) {
		$image = $images['url'];
		var_dump($image);
	}*/
	
?>