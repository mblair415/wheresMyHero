# Where's My Hero!?
Where's My Hero!? - <i>Link to Deployed version of the project</i>


## Who is our user?
Our user is a tech savvy sandwich aficionado.  Someone who won’t be fooled by any questionable piece of meat sitting lacklusterly between a pair of tired old buns.  No!  Our user expects the greatest culinary experience offered.  But, the question remains, where to get it?  Where’s their club, their open face, their BLAT ...  where’s their hero?

Thats where we come in.  We host reviews of sandwiches to help our users find the best usage of their food oriented face holes.  We find their hero and we tell them right where to shove it!


See the published project at github.com/sf-wdi-labs/readme-example!


## Technologies Used

jQuery
HTML
CSS
Express
NodeJS
Mongoose
Bootstrap
JavaScript
Handlebars
Mongoose Sessions
Yelp api
Google Maps api
Geolocation api
Giphy api
Google fonts api




## Code I'm Proud Of

### Ryan Johnson:

### Michael Blair:
I'm very proud of the map functionality I wrote.  I've set up the map to hide by default, and to open at the touch of a button.  Upon opening the button to deploy it hides, and a button to change the location to the user's current location appears.  I'm especially proud of the code that will detect the user moving the map and show another button that enables the user to search for food at the new center of the map allowing them to check other neighborhoods.  And, when the map is drawn the button to search in the new location vanishes and only appears when the map is moved again.

A challenge I faced while writing this was in learning how to locate the coordinates for the center of the map.  I found many posts online and much documentation about how to change the center of the map, but not the other way around.  When I saw that the code to change the center was .setCenter() I thought that if I was writing the software I would use .getCenter() to get the center of the map at a specific location, then found that the function existed, but with very little documentation or posts about usage.  After more searching and trial and error I learned that with this function you call the .lat() and .lng() functions to finalize the call.

// Listener for searching where the map is currently centered
$('.change-location').on('click', '#change-location', function(){
  console.log('Searching in the new map location');
  var movedMapLocation = {
    location: {
      lat: map.getCenter().lat(),
      lng: map.getCenter().lng()
    }
  }

  createMap(movedMapLocation);
})

// button listener to hide the map area once it's open
$('.map-section').on('click', '#hide-map-button', function(){
  $('#hero-map').hide();
  $('.find-hero-button').show();
})

//Detects clicking and dragging on the map, shows the button to search
$('.hero-map').mousedown(function(){
  if ($('.hero-map').mousemove(function(){
  })){
    $('.change-location').show(600);
  }
})





### Ryan Thomas:



## Screen Shots
<imghttp://imgur.com/a/XHNJR
<img src="http://imgur.com/a/XHNJR" height="175" style="max-width: 320px">
<img src="http://imgur.com/a/Um5wY" height="175" style="max-width: 320px">
<img src="http://imgur.com/a/Um5wY" height="175" style="max-width: 320px">
