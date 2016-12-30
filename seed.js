
var db = require("./models");

var reviewSamples =[
];

reviewSamples.push({
              stars: 4,
              reviewContent: 'Such a delicious sandwich',
              upvotes: 37,
              recommend: true,
              gif: 'http://media3.giphy.com/media/XHAQPPV2lMpCo/100w.gif'
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'Juicy and messy, but not very good.  Still, very unique and worth trying.',
              upvotes: 5,
              recommend: true,
              gif: 'http://media2.giphy.com/media/14qGOyLfATB5ok/100w.gif'
            });

reviewSamples.push({
              stars: 5,
              reviewContent: 'I really liked how the meat and veggies were between the bread.',
              upvotes: 111,
              recommend: true,
              gif: 'https://media1.giphy.com/media/o9gX2fZzZ1mLu/100w.gif'
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'This was the best sandwich I never ate. I bought it and dropped it on the ground by accident.   I cri evrtiem!!one!',
              upvotes: 42,
              recommend: true,
              gif: 'http://media3.giphy.com/media/3owypf6HrM3J7UTvAA/100w.gif'
            });

reviewSamples.push({
              stars: 1,
              reviewContent: 'There was a hair in my sandwich.  I specifically told them I wanted a vegetarian sandwich',
              upvotes: 58,
              recommend: false,
              gif: 'http://media4.giphy.com/media/CEXDSZBbrLVmM/100w.gif'
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'It was awful.  I liked nothing about it, and the service was poor.',
              upvotes: 13,
              recommend: false,
              gif: 'https://media3.giphy.com/media/2pU8T0OTNkmre/100w.gif'
            });

reviewSamples.push({
              stars: 4,
              reviewContent: 'Really good, but not special and I did not have a good dining experience, so I can not recommend it.',
              upvotes: 31,
              recommend: false,
              gif: 'http://media2.giphy.com/media/oVIJX9HoKYI8w/100w.gif'
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'Meh....had better',
              upvotes: 77,
              recommend: false,
              gif: 'http://media1.giphy.com/media/IScTu2L6wFJYc/100w.gif'
            });

var userSamples = [{
  firstName: 'Ryan',
  lastName: 'Thomas',
  username: 'SammichKing',
  password: 'BradySucks',
  sandwiches: [],
  reviews: []
}]

var sandwichSamples = []

sandwichSamples.push({
  name: 'Famous Turkey Sandwich',
  type: 'Turkey',
  hot: false,
  price: 8.00,
  restaurant: '782 Arguello Blvd, San Francisco, CA 94118', //May eventually be a relationship to restaurant model
  Speed: 7,
  Reviews: []
})

sandwichSamples.push({
  name: 'Short Rib with Carmalized Onions',
  type: 'BBQ',
  hot: true,
  price: 6.00,
  restaurant: '8 trinity plaza, San Francisco, CA 94104', //May eventually be a relationship to restaurant model
  Speed: 10,
  Reviews: []
})

sandwichSamples.push({
  name: 'Hot Cappicola',
  type: 'Salami',
  hot: true,
  price: 7.00,
  restaurant: '3108 16th St San Francisco CA 94103', //May eventually be a relationship to restaurant model
  Speed: 4,
  Reviews: []
})

db.Review.remove({}, function(err, reviews){
  db.Review.create(reviewSamples, function(err, reviews){
    if (err) { return console.log('ERROR', err); }
    console.log('all reviews deleted before reseeding');
    console.log("all reviews:", reviews);
    console.log("created", reviews.length, "reviews");
  });
});

db.User.remove({}, function(err, users){
  db.User.create(userSamples, function(err, users){
    if (err) { return console.log('ERROR', err); }
    console.log('all users deleted before reseeding');
    console.log("all users:", reviews);
    console.log("created", users.length, "users");
  });
});

db.Sandwich.remove({}, function(err, sandwiches){
  db.Sandwich.create(sandwichSamples, function(err, sandwiches){
    if (err) { return console.log('ERROR', err); }
    console.log('all sandwiches deleted before reseeding');
    console.log("all sandwiches:", sandwiches);
    console.log("created", sandwiches.length, "sandwiches");
    process.exit();
  });
});
