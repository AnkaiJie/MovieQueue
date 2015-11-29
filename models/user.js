var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = mongoose.Schema({
	facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String,
        friends		 : Object
    },
    movies: []
});

var user = mongoose.model('User', userSchema);

module.exports = user;