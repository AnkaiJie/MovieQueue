var path = require('path');
var express = require('express');
var facebook = require('./app/fbFriends.js');
var request = require('request');
var router = express.Router();
var bodyParser = require('body-parser');

module.exports = function(app, passport, User) {

	app.use(bodyParser.json());
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
					user.save();
					var name = user.facebook.name;
					var id = user._id;
					var movies = user.movies;
					console.log(id);
					console.log(user);
					res.render('home.ejs', {
						name : name,
						id : id,
						movies : movies
					});
				});
			} else {
				// console.log("not logged in");
				res.render('index.ejs');
			}
		});
	});

	app.get('/getAllUsers', function(req, res) {
		// var name = req.params.name;
		// User.findOne({
		// 'facebook.name' : name
		// }, function(err, user) {
		// if (err)
		// console.log(err);
		// else
		// res.json(user);
		// });
		User.find({}, function(err, doc) {
			console.log(doc);
			res.send(doc);
		});
	});

	app.post('/addMovie', function(req, res) {
		var keyword = req.body.keyword;
		var name = req.body.name;

		User.findOne({
			'facebook.name' : name
		}, function(err, user) {
			if (err)
				console.log("error:" + err);
			else {
				console.log(user);
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
						res.json(user.movies);
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

	app.post('/search', function(req, res) {
		var name = req.body.name;
		User.findOne({
			'facebook.name' : req.user.facebook.name
		}, function(err, user) {
			if (err)
				console.log('error: ' + err);
			else {
				res.json({
					friendName : user.facebook.name,
					friendMovies : user.movies
				});
			}
		});
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