var jwt = require('jsonwebtoken');
var expressJwt = require('express-jwt');
var config = require('../../config/config');
var checkToken = expressJwt({ secret: config.secrets.jwt });
var User = require('./userModel');

exports.decodeToken = function() {
    return function(req, res, next) {
        if (req.query && req.query.hasOwnProperty('access_token')) {
            req.headers.authorization = 'Bearer ' + req.query.access_token;
        }
        checkToken(req, res, next);
    };
};

exports.getFreshUser = function() {
    return function(req, res, next) {
        User.findById(req.user._id)
          .then(function(user) {
            if (!user) {
                res.status(401).send('Unauthorized');
            } else {
                req.user = user;
            next();
            }
        }, function(err) {
            next(err);
        });
    }
};

exports.verifyUser = function() {
    return function(req, res, next) {
      var googleId = req.body.googleId;
      if (!googleId) {
        res.status(400).send('You need a google Id');
        return;
      }
  
      User.findOne({googleId: googleId})
        .then(function(user) {
          if (!user) {
            var newUser = new User(req.body);
            newUser.save(function(err, user) {
                if(err) {next(err);}
                req.user = user;
                next();
            });
          } else {
              req.user = user;
              next();
          }
        }, function(err) {
          next(err);
        });
    };
};

exports.signToken = function(id) {
    return jwt.sign(
      {_id: id},
      config.secrets.jwt
    );
};