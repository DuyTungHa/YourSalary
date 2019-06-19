var Session = require('./sessionModel');
var _ = require('lodash');
var mongoose = require('mongoose');

exports.params = function(req, res, next, id) {
    Session.findById(id)
        .exec()
        .then(function(session) {
            if(!session) {
                res.status(404).send('No session with that id');
            } else {
                req.session = session;
                next();
            }
        }, function(err){
            next(err);
        });
};

exports.get = function(req, res, next) {
    Session.find({freelancer: req.user._id})
        .exec()
        .then(function(sessions){
            res.json(sessions);
        }, function(err){
            next(err);
        });
};

exports.getOne = function(req, res, next) {
    if(!req.user._id.equals(mongoose.Types.ObjectId(req.session.freelancer))){
        res.status(401).send('Unauthorized');
    } else {
        res.json(req.session);
    }
}

exports.put = function(req, res, next) {
    var session = req.session;
    var update = req.body;
    _.merge(session, update);
    session.save(function(err, saved){
        if(err){
            next(err);
        } else {
            res.json(saved);
        }
    });
};

exports.post = function(req, res, next) {
    var newSession = req.body;
    newSession.freelancer = req.user._id;
    Session.create(newSession)
        .then(function(session) {
            res.json(session);
        }, function(err){
            next(err);
        });
};

exports.delete = function(req, res, next) {
    req.session.remove(function(err, removed) {
        if(err) {
            next(err);
        } else {
            res.json(removed);
        }
    });
};

exports.addSum = function(req, res, next) {
    var user = req.user;
    user.sumSalary += req.session.salary;
    user.save(function(err, saved) {
        if(err)
            next(err);
        else 
            res.json(saved.toJson());
    });
}

exports.subtractSum = function(req, res, next) {
    var user = req.user;
    user.sumSalary = user.sumSalary < req.session.salary ? 0 : user.sumSalary - req.session.salary;
    user.save(function(err, saved) {
        if(err)
            next(err);
        else 
            res.json(saved.toJson());
    });
}