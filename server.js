var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var database = require('./models/database.js');

// SETUP
mongoose.connect(database.url);
app.use(bodyParser.urlencoded({
	'extended' : 'true'
})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json());

// DB Models
var User = require('./models/user.js');
var Movie = require('./models/movie.js');

//Setting up router
var router = express.Router();
app.use('/', router);

// Routes

// Port Listen
app.listen(port);
console.log("We are rocking port: " + port);