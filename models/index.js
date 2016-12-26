var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wheres-my-hero');

module.exports.Review = require('./review.js');
module.exports.Sandwich = require('./sandwich.js');
module.exports.User = require('./user.js');
