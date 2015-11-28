var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema ({
	title: String,
	year: Number
});


var movie = mongoose.model('Movie', movieSchema);

module.exports = movie;