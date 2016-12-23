
var db = require("./models");

var reviewSamples =[
];

reviewSamples.push({
              stars: 4,
              reviewContent: 'Such a delicious sandwich',
              upvotes: 37,
              recommend: true
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'Juicy and messy, but not very good.  Still, very unique and worth trying.',
              upvotes: 5,
              recommend: true
            });

reviewSamples.push({
              stars: 5,
              reviewContent: 'I really liked how the meat and veggies were between the bread.',
              upvotes: 111,
              recommend: true
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'This was the best sandwich I never ate. I bought it and dropped it on the ground by accident.   I cry evrtiem!!one!',
              upvotes: 42,
              recommend: true
            });

reviewSamples.push({
              stars: 1,
              reviewContent: 'There was a hair in my sandwich.  I specifically told them I wanted a vegetarian sandwich',
              upvotes: 58,
              recommend: false
            });

reviewSamples.push({
              stars: 2,
              reviewContent: 'It was awful.  I liked nothing about it, and the service was poor.',
              upvotes: 13,
              recommend: false
            });

reviewSamples.push({
              stars: 4,
              reviewContent: 'Really good, but not special and I did not have a good dining experience, so I can not recommend it.',
              upvotes: 31,
              recommend: false
            });

reviewSamples.push({
              stars: 3,
              reviewContent: 'Meh....had better',
              upvotes: 77,
              recommend: false
            });

db.Review.remove({}, function(err, reviews){
  db.Review.create(reviewSamples, function(err, reviews){
    if (err) { return console.log('ERROR', err); }
    console.log('all reviews deleted before reseeding');
    console.log("all reviews:", reviews);
    console.log("created", reviews.length, "reviews");
    process.exit();
  });
});
