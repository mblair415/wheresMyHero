
var db = require("./models");

var reviewSamples =[
];

reviewSamples.push({
              stars: 4,
              reviewContent: 'Such a delicious sandwich',
              recommend: true,
              gif: 'http://media3.giphy.com/media/XHAQPPV2lMpCo/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'Juicy and messy, but not very good.  Still, very unique and worth trying.',
              recommend: true,
              gif: 'http://media2.giphy.com/media/14qGOyLfATB5ok/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 5,
              reviewContent: 'I really liked how the meat and veggies were between the bread.',
              recommend: true,
              gif: 'https://media1.giphy.com/media/o9gX2fZzZ1mLu/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'This was the best sandwich I never ate. I bought it and dropped it on the ground by accident.   I cri evrtiem!!one!',
              recommend: true,
              gif: 'http://media3.giphy.com/media/3owypf6HrM3J7UTvAA/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 1,
              reviewContent: 'There was a hair in my sandwich.  I specifically told them I wanted a vegetarian sandwich',
              recommend: false,
              gif: 'http://media4.giphy.com/media/CEXDSZBbrLVmM/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'It was awful.  I liked nothing about it, and the service was poor.',
              recommend: false,
              gif: 'https://media3.giphy.com/media/2pU8T0OTNkmre/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 4,
              reviewContent: 'Really good, but not special and I did not have a good dining experience, so I can not recommend it.',
              recommend: false,
              gif: 'http://media2.giphy.com/media/oVIJX9HoKYI8w/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'Meh....had better',
              recommend: false,
              gif: 'http://media1.giphy.com/media/IScTu2L6wFJYc/100w.gif',
              sandwiches: [],
              users: [],
              restaurants: []
            });

var userSamples = [{
  firstName: 'Ryan',
  lastName: 'Thomas',
  username: 'SammichKing',
  password: 'BradySucks',
  sandwiches: [],
  reviews: [],
  restaurants: []
}]

var sandwichSamples = []

sandwichSamples.push({
  type: 'Turkey',
  reviews: [],
  sandwiches: [],
  users: []
})

sandwichSamples.push({
  type: 'Roast Beef',
  reviews: [],
  sandwiches: [],
  users: []
})

sandwichSamples.push({
  type: 'Italian',
  reviews: [],
  sandwiches: [],
  users: []
})

var restaurantSamples = []

restaurantSamples.push({
  name: "The Boy's Deli",
  sandwiches: [],
  users: [],
  reviews: []
})

var restaurant,
    reviews,
    userStore,
    sandwiches

db.Restaurant.remove({}, function(err, restaurant){
  db.Restaurant.create(restaurantSamples, function(err, restaurant){
    if (err) { return console.log('ERROR', err); }
    console.log('all restaurants deleted before reseeding');
    console.log("all restaurants:", restaurant);
    console.log("created", restaurant.length, "restaurant");
  });
});

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
    console.log("all users:", users);
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
