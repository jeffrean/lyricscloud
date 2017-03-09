function contains(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
      if (arr[i].toLowerCase() === obj.toLowerCase()) {
          return true;
      }
  }
  return false;
}
function AddTOCloud() {
var artistsList = localStorage.getItem("artistList");
var artistNew = document.getElementById("project-search").value;

if (artistNew.length >= 3 && contains(artistsList.split(','), artistNew) === false) {
  //window.location.href = "wordcloud.html?artists=" + artistsList + ',' + artistNew;
  localStorage.setItem("artistList",JSON.stringify("Adele,Diddy"));
  return true;
} else {
    //alert("Please enter a valid artist name!");
  return false;
}
}
function readJSON(file) {
var request = new XMLHttpRequest();
request.open('GET', file, false);
request.send(null);
if (request.status == 200)
  return request.responseText;
}

function getParameterByName(name, url) {
 if (!url) {
  url = window.location.href;
 }
 name = name.replace(/[\[\]]/g, "\\$&");
 var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
 if (!results) return null;
 if (!results[2]) return '';
 return decodeURIComponent(results[2].replace(/\+/g, " "));
}
function searchArtists(artists) {
localStorage.setItem("artistList", artists);
var raw_lyrics = "";
var artists_data = [];
for(var i = 0; i < artists.length; i++)
{
  var raw = readJSON('getLyrics.php?artist=' + artists[i]);
  var text = JSON.parse(raw);
  for(var j = 0; j < text.songs.length; j++)
  {
    raw_lyrics += ' ' + text.songs[j].lyrics;
  }
  artists_data.push(raw);
}
localStorage.setItem("artistData", JSON.stringify(artists_data));
var wordfreq = WordFreq({
  workerUrl: "wordfreq.worker.js",
  stopWords: true
});
wordfreq.process(raw_lyrics, function(list) {
  if(list.length > 250) {
    list = list.splice(0, 250);
  }
  var cloud = WordCloud(document.getElementById('my_canvas'), {
    list: list,
    gridSize: 0,
    weightFactor: 3,
    backgroundColor: "white",
    maxRotation: 0,
    minRotation: 0,
    drawOutOfBound: false,
    click: function(item, dimension, event) {
      localStorage.setItem("wordChosen", item);
      window.location = "SongList.html";
    }
  });
});
}

/////////////////////////////////facebook publishing///////////////////////////////////////////////
// load image from data url
window.addEventListener("load", function(){

window.fbAsyncInit = function () {
    FB.init({
        appId: '762052787294333',
        xfbml: true,
        version: 'v2.8'
    });
    FB.AppEvents.logPageView();
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

      document.getElementById("shareToFacebook-button").onclick = function () {
        var data = document.getElementById("my_canvas").toDataURL("image/png");
        try {
            blob = dataURItoBlob(data);
        } catch (e) {
            console.log(e);
        }
        FB.getLoginStatus(function (response) {
            console.log(response);
            if (response.status === "connected") {
                postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
            } else if (response.status === "not_authorized") {
                FB.login(function (response) {
                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {scope: "publish_actions"});
            } else {
                FB.login(function (response) {
                    postImageToFacebook(response.authResponse.accessToken, "Canvas to Facebook/Twitter", "image/png", blob, window.location.href);
                }, {scope: "publish_actions"});
            }
        });
    }
  });
    function postImageToFacebook(token, filename, mimeType, imageData, message) {
        var fd = new FormData();
        fd.append("access_token", token);
        fd.append("source", imageData);
        fd.append("no_story", true);

        // Upload image to facebook without story(post to feed)
        $.ajax({
            url: "https://graph.facebook.com/me/photos?access_token=" + token,
            type: "POST",
            data: fd,
            processData: false,
            contentType: false,
            cache: false,
            success: function (data) {
                console.log("success: ", data);

                // Get image source url
                FB.api(
                    "/" + data.id + "?fields=images",
                    function (response) {
                        if (response && !response.error) {
                            //console.log(response.images[0].source);

                            // Create facebook post using image
                            FB.api(
                                "/me/feed",
                                "POST",
                                {
                                    "message": "",
                                    "picture": response.images[0].source,
                                    "link": "",
                                    "name": 'WordCloud',
                                    "description": message,
                                    "privacy": {
                                        value: 'SELF'
                                    }
                                },
                                function (response) {
                                    if (response && !response.error) {
                                        console.log("Posted story to facebook");
                                        console.log(response);
                                    }
                                }
                            );
                        }
                    }
                );
            },
            error: function (shr, status, data) {
                console.log("error " + data + " Status " + shr.status);
            },
            complete: function (data) {
                //console.log('Post to facebook Complete');
            }
        });
    }

    function dataURItoBlob(dataURI) {
        var byteString = atob(dataURI.split(',')[1]);
        var ab = new ArrayBuffer(byteString.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ab], {type: 'image/png'});
    }
///////////////////////////////////////////////////////////////////////

  var artists = getParameterByName('artists');
  if(artists==null)
  {
    artists = localStorage.getItem("artists");
  }
  artists = artists.replace(/ /g, "_").split(',');
  searchArtists(artists);
