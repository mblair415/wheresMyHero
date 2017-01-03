var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var ReviewSchema = new Schema ({
  gif: String,
  stars: Number,
  reviewContent: String,
  recommend: Boolean,
  sandwiches: [{
    type: Schema.Types.ObjectId,
    ref: 'Sandwich'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
});


var Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
