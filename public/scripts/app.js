console.log('sanity check, app.js is connected')

var yelpSearch = {
'term': 'sandwich',
'latitude': '37.786882',
'longitude': '-122.399972'
}

$(document).ready(function(){
  console.log('The DOM body is ready')

  client.search({
    term:'sandwich',
    location: 'san francisco, ca'
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
  });

  //ajax call to bring in data from yelp...couldn't get this working
  // $.ajax({
  //   method: 'GET',
  //   dataType: 'json',
  //   // cache: true,
  //   // jsonpCallback : yelpCallback,
  //   url: 'https://api.yelp.com/v3/businesses/search',
  //   data: yelpSearch,
  //   headers: {'Authorization' : 'Bearer 8V86AAXA6DIBETY505B-Ko5o0dp5Z1SrQ0Aee93tBmf_Guthvf7o9ei1cICj1UrgwADicpL1aGy5PQnrdiddwQHCYGTMRaEd2qSEJXAfdveACsEEODgz0igWOHFgWHYx'},
  //   success: yelpSuccess,
  //   error: yelpError
  // });


/*
event listener listening for submitition
prevent default
collect info in ajax. serialize.
use ajax to pass info to server.js
server.js tells server and db to handle the call.
*/

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

function newReviewSuccess(review){
  console.log('ajax call on review successful.  Review: ', review);
}

function newReviewError(error){
  console.log('ajax call on review dun messed up.  Error: ', error);
}

function yelpSuccess(restaurant){
  console.log(restaurant)
}

function yelpError (error){
  console.log('ajax call on yelp dun messed up.  Error: ', error);
}

function yelpCallback (data){
  console.log('this is the yelp callback', data)
}

})
