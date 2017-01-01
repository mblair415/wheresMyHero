console.log('sanity check, app.js is connected')


////Declare global variables here
var map;


// var yelpSearch = {
// 'term': 'sandwich',
// 'latitude': '37.786882',
// 'longitude': '-122.399972'
// }

var template;
var $reviewsList;
var allReviews = [];

var giphyApi = "http://api.giphy.com/v1/gifs/search";

$(document).ready(function(){
  console.log('The DOM body is ready')
  console.log('Body parser parsing that body!');


  // $.ajax({
  //   method: 'POST',
  //   url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDN9w5iCC44NN-_bnoO7Yu8ZXnmHB_QmJg',
  //   success: searchYelp,
  //   error: noLocation
  // });

  // function searchYelp(data){
  //   console.log('location found - lat: ', data.location.lat, 'lng: ', data.location.lng)
  //   map = new google.maps.Map(document.getElementById('mapPlacement'), {
  //   center: {lat: data.location.lat, lng: data.location.lng},
  //   zoom: 15
  //   })
  //   $.ajax({
  //     method: 'POST',
  //     url: '/api/locations',
  //     data: data,
  //     success: showRestaurants,
  //     error: noRestaurants
  //   })
  // }

  function noLocation(data){
    console.log('could not find location ', data)
  }

  function showRestaurants(data){
    console.log('you found restaurants! ', data)
    data.forEach(function(restaurant){
      var location = {
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude
      }
      var content = '<h6>' + restaurant.name + '</h6>' + '<p>' + restaurant.location.address1 + '</p>'
      addMarker(location, content)
    })
  }

  function addMarker(position, content){
              var myLatlng, marker, infowindow,contentString;
              marker = new google.maps.Marker({
                  position: position,
                  map: map
              });
              contentString = content;
              infowindow = new google.maps.InfoWindow({
                  content: contentString
              });
              marker.addListener('click', function() {
                 infowindow.open(map, marker);
              });
         }

  function noRestaurants(data){
    console.log('you found no restaurants :( ', data)
  }

  // client.search({
  //   term:'sandwich',
  //   location: 'san francisco, ca'
  // }).then(response => {
  //   console.log(response.jsonBody.businesses[0].name);
  // });

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

//*****************
//*****************
//Must uncommment this section
//to get giphy handlebars to work

  //Gif Handlebars templates
  var sourceOne = $('#selectableGif-template2').html(),
    templateGif = Handlebars.compile(sourceOne);
    sourceThree = $('#gif-choice').html(),
    templateGifChoice = Handlebars.compile(sourceThree);

//*****************
//*****************

  //Review Handlebars template
  // $reviewsList = ('#review-form');
  // var sourceTwo = $("#review-template").html(),
  // templateReview = Handlebars.compile(sourceTwo);

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

  // this is what searches giphy for images
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

  // this is what handles clicking on a gif
  $('.gifSelectionField2').on('click', '.gifBox', function(event){
    $('.gifSelectionField2').empty();
    // console.log('i still know what you clicked on! ', this.src);
    var pickedGifHtml = templateGifChoice({ userChosenGif: this.src});
    $('.selected-gif').empty();
    $('.selected-gif').append(pickedGifHtml);
  })

  // this is what populates selectable gifs
  function newGifSearchSuccess(json){
    console.log('ajax call for gif successful.  Gif: ', json);
    $('.gifSelectionField2').empty();
    json.data.forEach(function(gif){
      var giphyHtml = templateGif({ insertGifHere: gif.images.fixed_width_small.url});
      $(".gifSelectionField2").append(giphyHtml);
    });
  }

  // $.ajax({
  //   method: 'GET',
  //   url: '/api/reviews',
  //   success: appendReviews,
  //   error: noAppend
  // })
  //
  // function appendReviews(allReviews) {
  //   var reviewHtml;
  //
  //   // for each review:
  //   allReviews.forEach(function(reviewData){
  //     // create HTML for individual review
  //     reviewHtml = templateReview({
  //       reviewContent: reviewData.reviewContent,
  //       reviewStars: reviewData.stars,
  //       // turnary cheking to see if reviewData is true or false
  //       reviewRecommend: reviewData.recommend ? "Yes" : "No",
  //       reviewGif: reviewData.gif,
  //       reviewId: reviewData._id
  //       });
  //     // console.log("review appended", reviewData)
  //     // console.log(templateReview({reviewContent: reviewData.reviewContent}))
  //     // add review to top of review area
  //     $('.appendReviews').prepend(reviewHtml);
  //   });
  //   //it don't work ... it don't work at all!
  //   $('.reviewIndividual').on('click', '#edit-button', function(){
  //     console.log('the edit button was pressed!', this);
  //   })
  //   $('.reviewIndividual').on('click', '#delete-button', function(){
  //     console.log('the edit button was pressed!', this);
  //   })
  // };



  function newReviewSuccess(review){
    console.log('ajax call on review successful.  Review: ', review);
    appendReviews([review])
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

function noAppend (err){
  console.log('the reviews did not append', err)
};

function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}
