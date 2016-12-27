console.log('sanity check, app.js is connected')

var giphyApi = "http://api.giphy.com/v1/gifs/search";

$(document).ready(function(){
  console.log('The DOM body is ready')

  var source = $('#selectableGif-template2').html();

  var template = Handlebars.compile(source);
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

  $('#gifSearchButton').on('submit', function(event){
    console.log('seond gif submission button clicked');
    event.preventDefault();

    $.ajax({
      method: 'GET',
      url: 'http://api.giphy.com/v1/gifs/search?q=gif-input&api_key=dc6zaTOxFJmzC',
      data: $(this).serializeArray(),
      sucess: newGifSearchSuccess,
      error: newGifSearchError
    })
  })

  $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
    console.log('dude, you scrolled to the bottom');

     $.ajax({
       method: 'GET',
       url: 'http://api.giphy.com/v1/gifs/search?q=gif-input&api_key=dc6zaTOxFJmzC',
       data: $('form').serialize()+'&offset=25',
       success: giphySearchMoreSuccess,
       error: newGifSearchError
     })
    }
  });



  function newGifSearchSuccess(json){
    console.log('ajax call for gif successful.  Gif: ', json);
    $('.deleteThisClass').empty();
    json.data.forEach(function(gif){
      var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
      $(".gifSelectionField2").append(giphyHtml);
    });

    // json.data.forEach(function(gif){
    //   $('.deleteThisClass').append('<img src=' +
    //   gif.images.fixed_height_small.url + '>')
    // })
    // $('.searched-gifs').append(gif.data.forEach)
  }
})

// function newReviewSuccess(review){
//   console.log('ajax call on review successful.  Review: ', review);
// }
//
// function newReviewError(error){
//   console.log('ajax call on review dun messed up.  Error: ', error);
// }


// });


function giphySearchMoreSuccess(json){
  console.log('ajax call for MOAR gifs worked.  Gif: ', json);
  json.data.forEach(function(gif){
    var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
    $(".gifSelectionField2").append(giphyHtml);
  })
}

function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}
