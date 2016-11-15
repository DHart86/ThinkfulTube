$(document).ready(function() {
$('#search-button').on("click", function(event) {
  event.preventDefault();
  $('.col-4').empty();
  gapi.client.setApiKey('AIzaSyACxCVy8DYNaFHOF3ucEYGHuyYW7X-Bjwo');
  gapi.client.load('youtube', 'v3', function() {
    makeRequest();
  });
});

function makeRequest() {
  var nextToken = '';
  var prevToken = '';
  var q = $('#query').val() + " cats";
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet',
    maxResults: 6
  });
  request.execute(function(response) {
    //alert(JSON.stringify(response, '', 2))
    $('#results').empty();
    var srchItems = response.result.items;

    $.each(srchItems, function(index, item) {
      console.log(item);
      var title = item.snippet.title;
      var vidID = item.id.videoId;
      var next = response.nextPageToken;
      var prev = response.prevPageToken;
      vidThumburl = item.snippet.thumbnails.default.url;
      vidThumbimg = '<pre><img id="thumb" src="' + vidThumburl + '" alt="No  Image Available." style="width:204px;height:128px"></pre>';
      output = '<div class="col-4" id="vidDiv"><div class="title"><a target="_blank" href="https://youtube.com/watch?v=' + vidID + '">' + title + '</a></div><br><iframe src="https://www.youtube.com/embed/' + vidID + '"></iframe></div>';
      $('#results').append(output);
      $('h2, #next, #prev').removeClass('hidden');
      nextToken = next
      prevToken = prev
    })
  })

  //STARTING 
  //HERE
  //DELETE

  $('#next').on("click", function makeRequest() {
    var q = $('#query').val() + " cats";
    var request = gapi.client.youtube.search.list({
      q: q,
      part: 'snippet',
      maxResults: 6,
      pageToken: nextToken
    });
    request.execute(function(response) {
      //alert(JSON.stringify(response, '', 2))
      $('#results').empty();
      var srchItems = response.result.items;

      $.each(srchItems, function(index, item) {
        console.log(item);
        var title = item.snippet.title;
        var vidID = item.id.videoId;
        var next = response.nextPageToken;
        var prev = response.prevPageToken;
        vidThumburl = item.snippet.thumbnails.default.url;
        vidThumbimg = '<pre><img id="thumb" src="' + vidThumburl + '" alt="No  Image Available." style="width:204px;height:128px"></pre>';
        output = '<div class="col-4" id="vidDiv"><div class="title"><a target="_blank" href="https://youtube.com/watch?v=' + vidID + '">' + title + '</a></div><br><iframe src="https://www.youtube.com/embed/' + vidID + '"></iframe></div>';
        $('#results').append(output);
        nextToken = next
        prevToken = prev
      })
    })

    //THIS
    //IS

    //PREV

    $('#prev').on("click", function makeRequest() {
      var q = $('#query').val() + " cats";
      var request = gapi.client.youtube.search.list({
        q: q,
        part: 'snippet',
        maxResults: 6,
        pageToken: prevToken
      });
      request.execute(function(response) {
        $('#results').empty();
        var srchItems = response.result.items;

        $.each(srchItems, function(index, item) {
          console.log(item);
          var title = item.snippet.title;
          var vidID = item.id.videoId;
          var next = response.nextPageToken;
          var prev = response.prevPageToken;
          vidThumburl = item.snippet.thumbnails.default.url;
          vidThumbimg = '<pre><img id="thumb" src="' + vidThumburl + '" alt="No  Image Available." style="width:204px;height:128px"></pre>';
          output = '<div class="col-4" id="vidDiv"><div class="title"><a target="_blank" href="https://youtube.com/watch?v=' + vidID + '">' + title + '</a></div><br><iframe src="https://www.youtube.com/embed/' + vidID + '"></iframe></div>';
          $('#results').append(output);
          prevToken = prev
        })
      })

    })
  })
}
});