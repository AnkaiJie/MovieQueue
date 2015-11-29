var path = require('path');
var express = require('express');
var facebook = require('./app/fbFriends.js');
var request = require('request');

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
					var movies = user.movies;
					res.render('home.ejs', {
						name : name,
						movies: movies
					});
				});
			} else {
				// console.log("not logged in");
				res.render('index.ejs');
			}
		});
	});

	app.post('/addMovie', function(req, res) {
		var keyword = req.body.keyword;
		var user_name = req.body.name;

		User.findOne({
			'facebook.name' : user_name
		}, function(err, user) {
			if (err)
				console.log("error:" + err);
			else {
				request('https://api.themoviedb.org/3/search/movie?query=' + keyword + '&api_key=deca429e8664eb1b24c07c143d64068b', function(error, response, body) {
					if (!error && response.statusCode == 200) {
						console.log(body);
						var json = JSON.parse(body);
						var results = json.results[0];
						var movieInfo = {
							title : results.title,
							date : results.release_date,
							rating : results.vote_average
						}
						console.log(movieInfo);
						user.movies.push(movieInfo);
						user.save();
						console.log(user);
						res.send(user);
					}
				});
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

	app.get('/search', function(req, res) {
		var findName = req.params.name;
		User.findone({
			name : findName
		}, function(err, user) {

		})
	});

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