var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RestaurantSchema = new Schema ({
  name: String,
  sandwiches: [{
    type: Schema.Types.ObjectId,
    ref: 'Sandwich'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
})


var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
