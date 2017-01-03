var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema ({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
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
});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
