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

var clientId = 'eOjaSriPI77z1AOBq0X33w'
var clientSecret = 'UVTHGQC49f1hs4if3832UXZVqBr7Q4OrQxvcXVxLNxxNKk70TPr299T7rgtaS985'

// 'use strict';

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

// server.js pretend seed data.
// var reviewSample = [{
//   stars: 4,
//   reviewContent: 'superduper gud',
//   recommend: false,
//   upvotes: 417
//   },
//   {
//     stars: 1,
//     reviewContent: 'the stuff of nightmares, but on a plate',
//     recommend: true,
//     upvotes: 7
//   }
// ]
////////////////////
////Routes
////////////////////

////Get all reviews -- line 43 should work for seeded data.
app.get('/api/reviews', function(req, res){
  db.Review.find(function(err, review){
    if(err){
      console.log('Error in server.js', err);
    }
    console.log('all reviews are ', review);
    res.send(review)
    // res.send(reviewSample);
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


////Create one review  i think this is a train wreck
app.post('/api/reviews', function (req, res) {
  // create new book with form data (`req.body`)
  var newReview = new db.Review({
    stars: req.body.stars,
    reviewContent: req.body.reviewContent,
    recommend: req.body.recommend,
    upvotes: req.body.upvotes,
    gif: req.body.gif
  });
    // save newBook to database
    newReview.save(function(err, review){
      if (err) {
        return console.log("save review error: " + err);
      }
      console.log("saved ", review.reviewContent);
      res.json(review);
    });
});

// delete review  this may work
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
    console.log('your single review is ', foundReview);
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

////Get closest sandwich locations from yelp api
app.post('/api/locations/', function(req, res){
  yelp.accessToken(clientId, clientSecret).then(response => {
    const client = yelp.client(response.jsonBody.access_token);
    client.search({
      term:'sandwich',
      // location: req.params.location,
      latitude: req.body.location.lat,
      longitude: req.body.location.lng,
      radius: 800
    }).then(response => {
      // console.log(response.jsonBody.businesses[0].name);
      res.json(response.jsonBody.businesses)
    });
  }).catch(e => {
    console.log(e);
  });
})


////////////////////
////Login Routes
////////////////////

////Sign up new user
app.post('/signup', function (req, res) {
  db.User.register(new db.User({ username: req.body.username }), req.body.password,
    function (err, newUser) {
      passport.authenticate('local')(req, res, function() {
        res.send('signed up!!!');
      });
    }
  );
});

////User login route
app.post('/login', passport.authenticate('local'), function (req, res) {
  res.send('logged in: '+req.sessionID);
});

//// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

// App ID
// eOjaSriPI77z1AOBq0X33w
// App Secret
// UVTHGQC49f1hs4if3832UXZVqBr7Q4OrQxvcXVxLNxxNKk70TPr299T7rgtaS985


////Listen
app.listen(process.env.port || 3000, function(){
  console.log('express server online on port', 3000)
});
