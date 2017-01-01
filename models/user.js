var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  passportLocalMongoose = require('passport-local-mongoose');

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

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', UserSchema);
module.exports = User;
