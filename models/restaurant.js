var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var RestaurantSchema = new Schema ({
  name: String,
  location: String,
  sandwiches: [{
    type: Schema.Types.ObjectId,
    ref: 'Sandwich'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }]
})


var Restaurant = mongoose.model('Restaurant', RestaurantSchema);
module.exports = Restaurant;
