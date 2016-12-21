var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
  stars: Number,
  text: String,
  upvotes: Number,
  recommend: Boolean
})


var Review = mongoose.model('Review', ReviewSchema)
module.exports = Review
