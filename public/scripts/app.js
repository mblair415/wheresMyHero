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
  var source = ("#review-template");
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

function render() {
// empty existing posts from view
  $reviewsList.empty();

  var reviewHtml;

  // for each book:
  allReviews.forEach(function(reviewData){
    // create HTML for individual book
    reviewHtml = template({review: reviewData});
    // add book to page
    $reviewsList.append(reviewHtml);
  });
};

function newReviewSuccess(review){
  console.log('ajax call on review successful.  Review: ', review);
}

function newReviewError(error){
  console.log('ajax call on review dun messed up.  Error: ', error);
}

})
