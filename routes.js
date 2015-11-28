var path = require('path');
var express = require('express');
var facebook = require('./app/fbFriends.js');

module.exports = function(app, passport, User) {

	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/home', isLoggedIn, function(req, res) {
		User.findOne({
			'facebook.name' : req.user.facebook.name
		}, function(err, user) {
			if (err) {
				throw err
			} else if (user != null) {
				facebook.getFbData(user.facebook.token, '/me/friends', function(data) {
					user.facebook.friends = JSON.parse(data);
					console.log(user.facebook.friends.data);
					user.save();
					var name = user.facebook.name;
					res.render('home.ejs', {
						name : name
					});
				});
			} else {
				// console.log("not logged in");
				res.render('index.ejs');
			}
		});
	});

	app.get('/auth/facebook', passport.authenticate('facebook', {
		scope : 'user_friends'
	}));

	app.get('/auth/facebook/callback', passport.authenticate('facebook', {
		successRedirect : '/home',
		failureRedirect : '/'
	}));

	/*
	 * router.get('/search', function(req, res) { res.render(''); });
	 */

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