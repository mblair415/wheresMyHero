var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema ({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  sandwiches: [{
    type: Schema.Types.ObjectId,  //REFERENCING :D
    ref: 'Sandwich'
  }],
  reviews: [{
    type: Schema.Types.ObjectId,  //REFERENCING :D
    ref: 'Review'
  }]
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
