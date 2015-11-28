var path = require('path');
var express = require('express');

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
<<<<<<< HEAD
		res.render('home.ejs');
=======
		res.render('index.ejs');
>>>>>>> 0e871799b09df37a43e26ba9ef4bc0ad00f8e578
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