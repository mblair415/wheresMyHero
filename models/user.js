var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema ({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  sandwiches: [],
  reviews: []
});


var User = mongoose.model('User', UserSchema);
module.exports = User;
