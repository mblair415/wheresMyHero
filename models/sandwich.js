var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var SandwichSchema = new Schema ({
  name: String,
  type: String,
  hot: Boolean, //subcategory for different hot sandwiches
  price: Number,
  restaurant: String, //May eventually be a relationship to restaurant model
  Speed: Number,
  Reviews: [{
    type: Schema.Types.ObjectId,  //REFERENCING :D
    ref: 'Review'
  }]
});


var Sandwich = mongoose.model('Sandwich', SandwichSchema);
module.exports = Sandwich;
