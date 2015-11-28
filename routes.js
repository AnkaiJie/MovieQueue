var path = require('path');
var express = require('express');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('home.ejs');
		res.render('index.ejs');
	});

	app.get('/homePage', isLoggedIn, function(req, res) {
		console.log('in success function');
		res.render('homePage.ejs');
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'email'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/homePage',
		failureRedirect : '/'
	}));

	/*router.get('/search', function(req, res) {
		res.render('');
	});*/

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	function isLoggedIn(req, res, next) {
		console.log('in isLoggedIn function');
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
}