console.log('sanity check, app.js is connected')

$(document).ready(function(){
  console.log('The DOM body is ready')

/*
event listener listening for submitition
prevent default
collect info in ajax. serialize.
use ajax to pass info to server.js
server.js tells server and db to handle the call.
*/

  $('.form-horizontal').on('submit', function(event) {
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

function newReviewSuccess(review){
  console.log('ajax call on review successful.  Review: ', review);
}

function newReviewError(error){
  console.log('ajax call on review dun messed up.  Error: ', error);
}

})
