    console.log("pre")
$(document).ready(function() {
  console.log("starting")
$('#search-button').on("click", function() {
  event.preventDefault();
  console.log("hmm")
  $('.col-4').empty();
  gapi.client.setApiKey('AIzaSyACxCVy8DYNaFHOF3ucEYGHuyYW7X-Bjwo');
  gapi.client.load('youtube', 'v3', function() {
    console.log("pre")
    makeRequest();
    console.log("post")
  });
});

var commonVars = {};

function makeRequest(b) {
  console.log("making")
  var q = $('#query').val() + " cats";
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 6,
    pageToken: b
  });
  request.execute(function(response) {
   // alert(JSON.stringify(response, '', 2))
    $('#results').empty();
    var srchItems = response.result.items;
    $.each(srchItems, function(index, item) {
      console.log(item);
      var title = item.snippet.title;
      var vidID = item.id.videoId;
      commonVars.next = response.nextPageToken;
      commonVars.prev = response.prevPageToken;
      vidThumburl = item.snippet.thumbnails.medium.url;
      
     output = '<div class="col-sm-4" id="vidDiv"><div class="title"><a target="_blank" href="https://youtube.com/watch?v=' + vidID + '">' + title + '</a></div><br><iframe src="https://www.youtube.com/embed/' + vidID + '"></iframe></div>';
      $('#results').append(output);
      $('h1, #next, #prev').removeClass('hidden');
    })
  })
}


$('#next').on("click", function() {
  makeRequest(commonVars.next);
})

$('#prev').on("click", function() {
  makeRequest(commonVars.prev);
})

});