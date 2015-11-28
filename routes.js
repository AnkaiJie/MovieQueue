var path = require('path');
var express = require('express');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/homePage', isLoggedIn, function(req, res) {
		var name = req.user.facebook.name;
		res.render('home.ejs', {
			name : name
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'user_friends'
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
		console.log('in isLoggedIn function');
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
}