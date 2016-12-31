var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
  gif: String,
  stars: Number,
  reviewContent: String,
  upvotes: Number,
  recommend: Boolean
});


var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
