var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/wheres-my-hero');

module.Exports.Review = require('./review.js');
