var LocalStrategy = require('passport-local').Strategy;
var FbStrategy = require('passport-facebook').Strategy;

var User = require('../models/user.js');

var config = require('./auth.js');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use(new FbStrategy({
		clientID : config.fbAuth.clientID,
		clientSecret : config.fbAuth.clientSecret,
		callbackURL : config.fbAuth.callbackURL
	}, function(token, refreshToken, profile, done) {
		// asynchronous
		process.nextTick(function() {

			// find the user in the database based on their facebook id
			User.findOne({
				'facebook.id' : profile.id
			}, function(err, user) {

				// if there is an error, stop everything and return that
				// ie an error connecting to the database
				if (err)
					return done(err);

				// if the user is found, then log them in
				if (user) {
					return done(null, user); // user found, return that user
				} else {
					// if there is no user found with that facebook id, create
					// them
					var newUser = new User();
					newUser.facebook.id = profile.id;
					newUser.facebook.token = token;
//					console.log(token);
					newUser.facebook.name = profile.displayName;
//					FB.api ('/me/friends', function (response){
//						console.log (response);
//						newUser.facebook.friends = response;
//					});
					// save our user to the database
					newUser.save(function(err) {
						if (err) {
							console.log(err);
							throw err;
						}
						// if successful, return the new user
						return done(null, newUser);
					});
				}

			});
		});

	}));

};
