console.log('sanity check, app.js is connected')

var giphyApi = "http://api.giphy.com/v1/gifs/search";

$(document).ready(function(){
  console.log('The DOM body is ready')

/*
event listener listening for submitition
prevent default
collect info in ajax. serialize.
use ajax to pass info to server.js
server.js tells server and db to handle the call.
*/

  // $('.form-horizontal').on('submit', function(event) {
  //   console.log('submit clicked');
  //   event.preventDefault();
  //
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/reviews',
  //     data: $(this).serializeArray(),
  //     success: newReviewSuccess,
  //     error: newReviewError
  //   })
  // })

  $('.form-gif').on('submit', function(event){
    console.log('gif submit clicked');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: giphyApi,
      data: $(this).serializeArray(),
      success: newGifSearchSuccess,
      error: newGifSearchError
    })
  })




})

function newReviewSuccess(review){
  console.log('ajax call on review successful.  Review: ', review);
}

function newReviewError(error){
  console.log('ajax call on review dun messed up.  Error: ', error);
}

function newGifSearchSuccess(gif){
  console.log('ajax call for gif successful.  Gif: ', gif);
  gif.data.forEach(function(gif){
    $('.searched-gifs').append('<img src=' +
    gif.images.fixed_height_small.url + '>')
  })
  // $('.searched-gifs').append(gif.data.forEach)
}

function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}
