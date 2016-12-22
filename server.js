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
var reviewSample = {
  stars: 4,
  reviewContent: 'superduper gud',
  recommend: false,
  upvotes: 417
}

////Get all reviews
app.get('/api/reviews', function(req, res){
  db.Review.find(function(err, review){
    if(err){
      console.log('Error in server.js', err);
    }
    console.log('review is ', review);
    res.send(review);
  });
});

////Get one review



////Create one review



////Listen
app.listen(process.env.port || 3000, function(){
  console.log('express server online on port', 3000)
});
