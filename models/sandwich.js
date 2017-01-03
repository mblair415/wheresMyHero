var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SandwichSchema = new Schema ({
  type: String,
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'Review'
  }],
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});


var Sandwich = mongoose.model('Sandwich', SandwichSchema);
module.exports = Sandwich;
