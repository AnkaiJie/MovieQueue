
var path = require('path');
var express = require('express');

module.exports = function(app, passport) {
	var router = express.Router();
	app.use('/', router);
	app.use(express.static(path.resolve("./")));
	app.get('/', function(req, res) {
		res.sendFile('./index.html');
	});
}	