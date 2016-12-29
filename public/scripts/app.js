console.log('sanity check, app.js is connected')

////Declare global variables here
var map;


// var yelpSearch = {
// 'term': 'sandwich',
// 'latitude': '37.786882',
// 'longitude': '-122.399972'
// }

$(document).ready(function(){
  console.log('The DOM body is ready')

  $.ajax({
    method: 'POST',
    url: 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDN9w5iCC44NN-_bnoO7Yu8ZXnmHB_QmJg',
    success: searchYelp,
    error: noLocation
  });

  function searchYelp(data){
    console.log('location found - lat: ', data.location.lat, 'lng: ', data.location.lng)
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
      // marker = new google.maps.Marker({
      //   position: location,
      //   map: map,
      //   // icon: image,  ////Use this for custom marker image
      //   title: restaurant.name
      // })
      // marker.addListener('click', function() {
      //   infowindow.open(map, marker);
      // });
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
