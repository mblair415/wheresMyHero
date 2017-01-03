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

/*
TRASH THIS: fake data for testing before seed was available, or for testing
*/
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

////Get all reviews
app.get('/api/reviews', function(req, res){
  db.Review.find(function(err, review){
    if(err){
      console.log('Error in server.js', err);
    }
    console.log('all reviews are ', review);
    res.send(review)
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
  // create new review with form data (`req.body`)
  var newReview = new db.Review({
    stars: req.body.stars,
    reviewContent: req.body.reviewContent,
    recommend: req.body.recommend,
    upvotes: req.body.upvotes,
    gif: req.body.gif
  });

  // save newReview to database
    newReview.save(function(err, review){
      if (err) {
        return console.log("save review error: " + err);
      }
      console.log("saved ", review.reviewContent);
      // console.log(req.user)
      //req.user.reviews.push(review);
      //req.user.save();
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
      term:'sandwich',
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
  res.send('logged in!!! Session ID : '+req.sessionID + "User name : "+ req.user.username);
});

//// log out user
app.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

////Listen


app.listen(process.env.PORT || 3000, function(){

  console.log('express server online on port', 3000)
});
