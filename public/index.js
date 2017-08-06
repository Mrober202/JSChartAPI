var app = function(){
  var url = "http://api.musixmatch.com/ws/1.1/chart.tracks.get?page=1&page_size=20&country=us&apikey=2c4cbdf3343840251f31b6eea134e5ec";
  makeRequest(url, requestComplete)
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
};

var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var songs = convertSongsResponse(JSON.parse(jsonString));
  var song = songs[0];
  populateOptions(songs);
  populateChart(songs);
};

var convertSongsResponse = function(songs){
  var songsFromObject = songs.message.body.track_list;
  var actualSongs = [];
  songsFromObject.forEach(function(song){
      actualSongs.push(song.track);
  });
  return actualSongs;
}

var populateOptions = function(songs) {
  var select = document.querySelector("select");
  songs.forEach(function(song) {
    var li = document.createElement("option");
    li.text = song.track_name + " by " + song.artist_name;
    select.appendChild(li); 
  })
  select.addEventListener("change", function(){
    showList(songs[this.selectedIndex - 1]);
  })
};

var showList = function(song) {
  var ul = document.getElementById("song-list");
  ul.innerHTML = '';
  var listItem1 = document.createElement("li");
  listItem1.innerText = "Title: " + song.track_name 
  var listItem2 = document.createElement("li");
  listItem2.innerText = "Artist: " + song.artist_name 
  var listItem3 = document.createElement("li");
  listItem3.innerText = "Album: " + song.album_name
  var listItem4 = document.createElement("img");
  listItem4.src = song.album_coverart_100x100  
  listItem4.className = "album-cover";

  ul.appendChild(listItem1);
  ul.appendChild(listItem2);
  ul.appendChild(listItem3);
  ul.appendChild(listItem4);
  }

  var populateChart = function(songs) {
    var ul = document.getElementById("chart-songs");
    while(ul.firstChild) {
      ul.removeChild(ul.firstChild);
    }
    songs.forEach(function(song) {
      var li = createListItem(song);
      ul.appendChild(li);
    })
  }
  var createListItem = function(song) {

    var songItem = document.createElement('li');
      songItem.classList.add("song");

        var idTag = document.createElement("p")
        idTag.innerText = song[selectedIndex];
        
        var nameTag = document.createElement('p');
        nameTag.innerText = song.track_name;

        var artistTag = document.createElement('p');
        artistTag.innerText = song.artist_name;

        songItem.appendChild(idTag);
        songItem.appendChild(nameTag);
        songItem.appendChild(artistTag);

        return songItem;
  }

window.addEventListener('load', app);