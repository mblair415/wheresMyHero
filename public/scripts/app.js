console.log('sanity check, app.js is connected')

//Declare global variables here
var map;
var template;
var $reviewsList;
var allReviews = [];

var giphyApi = "http://api.giphy.com/v1/gifs/search";

$(document).ready(function(){
  console.log('The DOM body is ready')
  console.log('Body parser parsing that body!');


  // automatically fetching user location (a google no-no) using google geolocation api
  $.ajax({
    method: 'POST',
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDN9w5iCC44NN-_bnoO7Yu8ZXnmHB_QmJg',
    success: createMap,
    error: noLocation
  });

  // creates a google map using geolocation info
  function createMap(data){
    console.log('location found - lat: ', data.location.lat, 'lng: ', data.location.lng);
    console.log('I know where you live!');
    map = new google.maps.Map(document.getElementById('mapPlacement'), {
    center: {lat: data.location.lat, lng: data.location.lng},
    zoom: 15
    })
    $.ajax({
      method: 'POST',
      url: '/api/locations',
      data: data,
      success: showRestaurants,
      error: noRestaurants
    })
  }

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

  // looks at each restaraunt sent from yelp
  function showRestaurants(data){
    console.log('you found restaurants! ', data)
    data.forEach(function(restaurant){
      var location = {
        lat: restaurant.coordinates.latitude,
        lng: restaurant.coordinates.longitude
      }
      // this is the content that goes on the card associated with each restaurant in the map
      var content = '<h6>' + restaurant.name + '</h6>' + '<p>' + restaurant.location.address1 + '</p>'
      addMarker(location, content)
    })
  }

  // places a marker on the map for each restaraunt
  function addMarker(position, content){
    var myLatlng, marker, infowindow,contentString;
    // places each marker
    marker = new google.maps.Marker({
      position: position,
      map: map
    });
    // fills in data for the card that appears when clicking on any marker
    contentString = content;
    infowindow = new google.maps.InfoWindow({
      content: contentString
    });
    // listen for click to open the window when a marker is clicked on
    marker.addListener('click', function() {
      // open the restaraunt info when marker clicked on
     infowindow.open(map, marker);
    });
  }

  function noRestaurants(data){
    console.log('you found no restaurants :(  NO SOUP FOR YOU ... wait ... sandwich ... NO SANDWICH FOR YOU!!', data)
  }

  /*
  ajax call to bring in data from yelp...couldn't get this working.  Can look at
  this later
  */
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

  //Gif Handlebars templates
  var sourceOne = $('#selectableGif-template2').html(),
    templateGif = Handlebars.compile(sourceOne),
    sourceThree = $('#gif-choice').html(),
    templateGifChoice = Handlebars.compile(sourceThree),


//*****************
//*****************

  // Review Handlebars template
  $reviewsList = ('#review-form');
  var sourceTwo = $("#review-template").html(),
  templateReview = Handlebars.compile(sourceTwo);

  // this is what submits the form to add a review in
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
    // empty space to prevent gifs from multiple searches showing at the same time
    $('.gifSelectionField2').empty();
    json.data.forEach(function(gif){
      var giphyHtml = templateGif({ insertGifHere: gif.images.fixed_width_small.url});
      $(".gifSelectionField2").append(giphyHtml);
    });
  }

  // when pages loads this will trigger and runs the append review function.  gets reviews from review all endpoint
  $.ajax({
    method: 'GET',
    url: '/api/reviews',
    success: appendReviews,
    error: noAppend
  })

  $('.map-section').on('click', '#map-button', function(){
    console.log('map button pressed');
  })

  // this is what spits out each review onto the page.
  function appendReviews(allReviews) {
    var reviewHtml;

    // for each review:
    allReviews.forEach(function(reviewData){
      // create HTML for individual review
      reviewHtml = templateReview({
        reviewContent: reviewData.reviewContent,
        reviewStars: reviewData.stars,
        // turnary cheking to see if reviewData is true or false - if true return yes, if false return no
        reviewRecommend: reviewData.recommend ? "Yes" : "No",
        reviewGif: reviewData.gif,
        reviewId: reviewData._id,
        });
      // add review to top of review area
      $('.appendReviews').prepend(reviewHtml);
    });

    // click event for pressing the edit review
    /*
    create small handlebars area within the review handle bars.
    this space will expand and display as needed as per handlebars.
    display the reviewContent field and allow that one field to be changed.
    save changes.
    */
    $('.reviewIndividual').on('click', '#edit-button', function(){
      var classes = $(this).attr("class").split(' ')[0];
      console.log('the edit button was pressed! Review Id is ' + classes);
      $.ajax({
        method: 'PUT',
        url: '/api/reviews/' + classes,
        data: $(this).serializeArray(),
        success: editReview,
        error: editFailure
      })
      // location.reload();
    })

    // click event for pressing the delete review button.  hits the delete route with Id from review
    $('.reviewIndividual').on('click', '#delete-button', function(){
      // sets variable to be the first class associated with this button (which is the id of the review)
      var classes = $(this).attr("class").split(' ')[0];
      console.log('the delete button was pressed! Review Id is ' + classes);
      $.ajax({
        method: 'DELETE',
        url: '/api/reviews/' + classes,
        success: deleteReview,
        error: deleteFailure
      })
      location.reload();
    })

  // this is the end of append reviews function
  };

  function editReview(data){
    console.log('Trying to edit the review below', data);
    templateReview({
      reviewContent: data.reviewContent2
    })
    console.log('The review was edited', data);
    return templateReview;
  }

// This is the end of on ready function
})

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

function noAppend (err){
  console.log('the reviews did not append', err)
}

function newGifSearchError(error){
  console.log('ajax call on gif search went bad, boss.  Error: ', error);
}

function deleteReview(data){
  console.log('delete review triggered!', data);
}

function deleteFailure(error){
  console.log('The delete went bad.  Did you delete the right thing?  Did you delete everything?', error);
}

function editFailure(error){
  console.log('Oh, no!  We have failed to edit!  Things remained the same, and you hated that stuff! Error: ', error);
}
