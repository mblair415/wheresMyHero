console.log('sanity check, app.js is connected')

var template;
var $reviewsList;
var allReviews = [];

$(document).ready(function(){
  console.log('The DOM body is ready')


/*
event listener listening for submitition
prevent default
collect info in ajax. serialize.
use ajax to pass info to server.js
server.js tells server and db to handle the call.
*/

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
}
