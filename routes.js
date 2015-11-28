var path = require('path');
var express = require('express');

module.exports = function(app, passport) {
	var router = express.Router();
	app.use('/', router);
	app.use(express.static(path.resolve("./")));

	app.get('/', function(req, res) {
		res.sendFile('./index.html');
	});

	app.get('/homePage', isLoggedIn, function(req, res) {
		res.status(200).send(req.user);
	});
	

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'email'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/homePage',
		failureRedirect : '/'
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
}