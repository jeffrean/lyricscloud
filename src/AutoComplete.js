var data = {};
var artist = "";
var artists = [];
var access_token = "viBFW_j39QZDdkY42kwsa__gzw6ng9P5iuaLoCf9xr4VAErPIB_9P2Jm1tpFbaVG";

document.addEventListener("onkeydown", function(event){
    alert("here");
    if (event.keyCode == 13) document.getElementById('project-button').click();
}, false);

function getUrl(artist) {
	return 'getArtists.php?artist=' + artist + '*';
    //return 'http://api.genius.com/search?q=' + artist + "&access_token=" + access_token;
}

function requestArtists(url) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            parseArtists(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', url, true);
    xhr.setRequestHeader("Accept", "");
    xhr.send(null);
}

//returns true if elem -> items (false otherwise)
function containsArtist(artists, artistName) {
    for (var i = 0; i < artists.length; i++) {
        if (artists[i].name.toLowerCase() == artistName.toLowerCase()) {
            return true;
        }
    }
    return false;
}

//parse artist from hits
function parseArtists(hits) {
	artists = [];
	//add new artists to list
	/*for (var i = 0; i < hits.length; i++) {
	  if (hits[i] !== undefined && hits[i].result !== undefined &&
		   hits[i].result.primary_artist !== undefined) {
		   var artist = {
		           "name": hits[i].result.primary_artist.name,
		           //"id": hits[i].result.primary_artist.id,
		           "image_url": hits[i].result.primary_artist.image_url
		       }
		       //check if list already contains artist
		   if (!containsArtist(artists, artist.name)) {
		       artists.push(artist);
		   }
	  } else {
		   console.log("undefined");
	  }
	}*/

	// using spotify
	artists = hits;

}

function search(artist) {
    requestArtists(getUrl(artist));
}

(function($) {

    var $project = $('#project-search');
    $project.autocomplete({
        minLength: 0,
        source: function(request, response) {
            search(request.term.slice(0,request.term.length-1));
            if(request.term.length >= 3){
							response(artists);
						}else {
							response({});
						}
        },
        focus: function(event, ui) {
            $project.val(ui.item.name);
            return false;
        },
        select: function(event, ui) {
            return false;
        }
    });

    $project.data("ui-autocomplete")._renderItem = function(ul, item) {

        var $li = $('<li>'),
            $img = $('<img>');


        $img.attr({
            src: item.image_url,
            alt: item.name,
            width: 50,
            height: 50
        });

        $li.attr('data-value', item.name);
        $li.append('<a href="#">');
        $li.find('a').append($img).append(item.name);

        return $li.appendTo(ul);
    };


})(jQuery);

function callGetLyrics(artist, lyricsList){
    data["name"] = artist;
    data["songs"] = lyricsList;
}

function callGetSongList() {
	artist = document.getElementById("project-search").value;
    if (containsArtist(artists, artist)) {
			window.location.href = "wordcloud.html?artists=" + artist;
    } else {
        alert("Please enter a valid artist name!");
    }
}

function refresh() {
    search(document.getElementById("project-search").value);
    //document.getElementById("project-search").autocomplete({ source: artists });
}


