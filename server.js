////////////////////
////Dependancies
////////////////////

var express = require('express'),
  app = express(),
  db = require('./models'),
  bodyParser = require('body-parser');
  // cookieParser = require('cookie-parser'), ///May no longer be needed
  session = require('express-session'),
  passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;

// given to use by yelp, required to use yelp api
var clientId = 'eOjaSriPI77z1AOBq0X33w'
var clientSecret = 'UVTHGQC49f1hs4if3832UXZVqBr7Q4OrQxvcXVxLNxxNKk70TPr299T7rgtaS985'

// creates an unmodifiable variable
// yelp fusion is the plugin that makes the yelp api work
const yelp = require('yelp-fusion');

app.use(bodyParser.urlencoded({
  extended : true
}));
// app.use(cookieParser());  ///May no longer be needed
app.use(session({
  secret: 'supersecretkey',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));

// passport config
passport.use(new LocalStrategy(db.User.authenticate()));
passport.serializeUser(db.User.serializeUser());
passport.deserializeUser(db.User.deserializeUser());

////////////////////
////Load landing page
////////////////////

app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile('views/index.html', {
    root : __dirname
  });
});

app.get('/create', function(req, res){
  console.log(__dirname);
  res.sendFile('views/create.html', {
    root : __dirname
  });
});

app.get('/edit', function(req, res){
  console.log(__dirname);
  res.sendFile('views/edit.html', {
    root : __dirname
  });
});

////////////////////
////Routes
////////////////////

////Get all reviews
app.get('/api/reviews', function(req, res){
  db.Review.find(function(err, reviews){
    if(err){
      console.log('Error in server.js', err);
    }
    // reviews.forEach(function(review) {
    //   db.User.findById(review.users[0], function(err, user){
    //     review[username] = user.username || "shiv";
    //   })
    // })
    res.send(reviews);
  });
});

//Get one review  this may work for seeded data
app.get('/api/reviews/:id', function(req, res) {
  var reviewId = req.params.id;
  db.Review.findOne({ _id: reviewId }, function(err, review){
    if(err){
      console.log('FindOne error in server.js', err);
    }
    console.log('your single review is ', review);
    res.send(review);
  })
})


//Create one review
app.post('/api/reviews', function (req, res) {
  console.log(req.body)

  // create new review with form data (`req.body`)
  var newReview = new db.Review({
    stars: req.body.stars,
    reviewContent: req.body.reviewContent,
    recommend: req.body.recommend,
    upvotes: req.body.upvotes,
    gif: req.body.gif
  });

  //save the review to the db
  newReview.save(function(err, review){
    if (err) {
      return console.log("save review error: " + err);
    }
    console.log("saved ", review.reviewContent);

  //look for the sandwich type in the db
    db.Sandwich.findOne({type: req.body.sandwichType}, function(err, sandwich){
      if(err){
        console.log('FindOne error in server.js', err);
        //if the sandwich exits, push related data
      } else if (sandwich){
        console.log('found a sandwich')
        sandwich.reviews.push(newReview)
        newReview.sandwiches.push(sandwich)
        sandwich.save()
      } else {
        //if it's a new sandwich, create it, then push related data
        console.log("that's a new sandwich")
        var newSandwich = new db.Sandwich({type: req.body.sandwichType})
        newSandwich.save()
        newSandwich.reviews.push(newReview)
        newReview.sandwiches.push(newSandwich)
        newSandwich.save()
        // console.log(newSandwich)
      }
      //save the changes
      newReview.save()
    })

    //look for the restaurant in the db
    db.Restaurant.findOne({name: req.body.restaurant}, function(err, restaurant){
      if(err){
        console.log('FindOne error in server.js', err);
        //if the restaurant exits, push related data
      } else if (restaurant){
        console.log('found a restaurant')
        restaurant.reviews.push(newReview)
        newReview.restaurants.push(restaurant)
        restaurant.save()
      } else {
        //if it's a new restaurant, create it, then push related data
        console.log("that's a new restaurant")
        var newRestaurant = new db.Restaurant({name: req.body.restaurant})
        newRestaurant.save()
        newRestaurant.reviews.push(newReview)
        newReview.restaurants.push(newRestaurant)
        // console.log(newRestaurant)
        newRestaurant.save()
      }
      //save the changes
      newReview.save()
    });
    newReview.users.push(req.user);
    newReview.save()
    // console.log(req.user);
    req.user.reviews.push(review);
    req.user.save();
    res.json(review);
    });
});

// delete review
app.delete('/api/reviews/:id', function (req, res) {
  console.log('review delete', req.params);
  var reviewId = req.params.id;
  db.Review.findOneAndRemove({ _id: reviewId }, function (err, deletedReview) {
    res.json(deletedReview);
  });
});

// edit one review
app.put('/api/reviews/:id', function (req, res){
  var reviewId = req.params.id;
  db.Review.findOne({ _id: reviewId }, function(err, foundReview){
    if(err){
      console.log('FindOne error in server.js', err);
    }
    console.log('your single review is ');
    foundReview.stars = req.body.stars || foundReview.stars;
    foundReview.reviewContent = req.body.reviewContent || foundReview.reviewContent;
    foundReview.recommend = req.body.recommend || foundReview.recommend;
    foundReview.upvotes = req.body.upvote || foundReview.upvotes;
    foundReview.gif = req.body.gif || foundReview.gif;
    foundReview.save(function(err, review){
      if (err) {
        return console.log("save review error: " + err);
      }
      console.log("saved ", review.reviewContent);
      res.json(review);
    });
  });
});

//Get closest sandwich locations from yelp api
app.post('/api/locations/', function(req, res){
  yelp.accessToken(clientId, clientSecret).then(response => {
    // sets the variable client as a constant
    const client = yelp.client(response.jsonBody.access_token);
    client.search({
      // what we search the yelp api for
      term: req.body.term || 'sandwich',
      // this is the geolocation and best match radius area
      latitude: req.body.location.lat,
      longitude: req.body.location.lng,
      radius: 800
    }).then(response => {
      // these are the businesses returned by yelp
      res.json(response.jsonBody.businesses)
    });
  }).catch(e => {
    console.log(e);
  });
})

////////////////////
////Login Routes
////////////////////

//Sign up new user
app.post('/signup', function (req, res) {
  db.User.register(new db.User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        // res.send('signed up!!!');
        res.redirect('/');
      });
    }
  );
});

//User login route
app.post('/login', passport.authenticate('local'), function (req, res) {
  // res.send('logged in!!! Session ID : '+req.sessionID + "User name : "+ req.user.username);
  res.redirect('/');
});

// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

//Get active user data
app.get('/api/user/active', function (req, res){
  res.json(req.user)
})

////////////////////
////Listen
////////////////////


app.listen(process.env.PORT || 3000, function(){

  console.log('express server online on port', 3000)
});
