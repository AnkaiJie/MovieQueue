var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./models/database.js');
var passport = require('passport');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var flash = require('connect-flash');
var path = require('path');
// get passport.js file configuration
require('./config/passport')(passport);

// SETUP
mongoose.connect(database.url);
app.use(bodyParser.urlencoded({
	'extended' : 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(session({
	secret : 'much secret',
	resave : false,
	saveUninitialized : false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use (express.static("public"));
app.set('view engine', 'ejs');

// DB Models
var User = require('./models/user.js');
var Movie = require('./models/movie.js');

// Setting up router
require('./routes.js')(app, passport, User);

// Port Listen
app.listen(port);
console.log("We are rocking port: " + port);

User.remove({}, function(err) {
	if (err)
		throw err;
	console.log("All Users Deleted");
});