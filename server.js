var express = require('express'),
  app = express(),
  db = require('./models'),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended : true
}));

app.use(express.static('public'));

app.get('/', function(req, res){
  console.log(__dirname);
  res.sendFile('views/index.html', {
    root : __dirname
  });
});

////////////////////
////Routes
////////////////////
var reviewSample = [{
  stars: 4,
  reviewContent: 'superduper gud',
  recommend: false,
  upvotes: 417
  },
  {
    stars: 1,
    reviewContent: 'the stuff of nightmares, but on a plate',
    recommend: true,
    upvotes: 7
  }
]

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
    upvotes: req.body.upvotes
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
    foundReview.save(function(err, review){
      if (err) {
        return console.log("save review error: " + err);
      }
      console.log("saved ", review.reviewContent);
      res.json(review);
    });
  });
});

////Listen
app.listen(process.env.port || 3000, function(){
  console.log('express server online on port', 3000)
});
