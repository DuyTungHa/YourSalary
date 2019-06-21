var signToken = require('./auth').signToken;
var _ = require('lodash');

exports.signin = function(req, res, next) {
    var token = signToken(req.user._id);
    res.json({token: token});
};

exports.put = function(req, res, next) {
    var user = req.user;
    var update = req.body;
    _.merge(user, update);
    user.save(function(err, saved) {
        if(err)
            next(err);
        else 
            res.json(saved.toJson());
    });
};

exports.me = function(req, res) {
    res.json(req.user.toJson());
};

exports.resetSalary = function(req, res, next) {
    var user = req.user;
    user.sumSalary = 0;
    user.save(function(err, saved) {
        if(err)
            next(err);
        else 
            res.json(saved.toJson());
    });
}
