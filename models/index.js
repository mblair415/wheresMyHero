var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wheres-my-hero');

module.exports.Review = require('./review.js');
