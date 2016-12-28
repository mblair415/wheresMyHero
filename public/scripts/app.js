console.log('sanity check, app.js is connected')


var template;
var $reviewsList;
var allReviews = [];

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
  var source = $('#selectableGif-template2').html();

  var template = Handlebars.compile(source);
  
  $reviewsList = ('#review-form');
  var source = $("#review-template").html();
  template = Handlebars.compile(source);

  $('.new-review').on('submit', function(event) {
    console.log('submit clicked');
    event.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/api/reviews',
      data: $(this).serializeArray(),
      success: newReviewSuccess,
      error: newReviewError
    })
  })
  
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

  $('.gifSelectionField2').on('click', '.gifBox', function(event){
    console.log('an image was clicked!', this.src);
  })


  // $('#gifSearchButton').on('submit', function(event){
  //   console.log('second gif submission button clicked');
  //   event.preventDefault();
  //
  //   $.ajax({
  //     method: 'GET',
  //     url: 'http://api.giphy.com/v1/gifs/search?q=gif-input&api_key=dc6zaTOxFJmzC',
  //     data: $(this).serializeArray(),
  //     sucess: newGifSearchSuccess,
  //     error: newGifSearchError
  //   })
  // })

  // $(window).scroll(function() {
  //   if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
  //   console.log('dude, you scrolled to the bottom');
  //
  //    $.ajax({
  //      method: 'GET',
  //      url: giphyApi,
  //      data: $('#gifId').serializeArray()+'&offset=25',
  //      success: giphySearchMoreSuccess,
  //      error: newGifSearchError
  //    })
  //   }
  // });

  function newGifSearchSuccess(json){
    console.log('ajax call for gif successful.  Gif: ', json);
    $('.deleteThisClass').empty();
    json.data.forEach(function(gif){
      var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
      $(".gifSelectionField2").append(giphyHtml);
    });
  }

  // function giphySearchMoreSuccess(json){
  //   console.log('ajax call for MOAR gifs worked.  Gif: ', json);
  //   json.data.forEach(function(gif){
  //     var giphyHtml = template({ insertGifHere: gif.images.fixed_width_small.url})
  //     $(".gifSelectionField2").append(giphyHtml);
  //   })
  // }

})

  $.ajax({
    method: 'GET',
    url: '/api/reviews',
    success: appendReviews,
    error: noAppend
  })

function appendReviews(allReviews) {
  var reviewHtml;

  // for each review:
  allReviews.forEach(function(reviewData){
    // create HTML for individual review
    reviewHtml = template({reviewContent: reviewData.reviewContent});
    console.log("review appended")
    // console.log(template({reviewContent: reviewData.reviewContent}))
    // add review to page
    $('.appendReviews').append(reviewHtml);
  });
};

function newReviewSuccess(review){
  console.log('ajax call on review successful.  Review: ', review);
}

function newReviewError(error){
  console.log('ajax call on review dun messed up.  Error: ', error);
}

})

function noAppend (err){
  console.log('the reviews did not append', err)
});

function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}
