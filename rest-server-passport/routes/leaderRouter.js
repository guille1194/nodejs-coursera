var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Leaderships = require('../models/leadership');
var Verify = require('./verify');

var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaderships.find({}, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaderships.create(req.body, function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        var id = leader._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the leader with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaderships.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

leaderRouter.route('/:leaderId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Leaderships.findById(req.params.leaderId, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaderships.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, {
        new: true
    }, function (err, leader) {
        if (err) throw err;
        res.json(leader);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Leaderships.findByIdAndRemove(req.params.leaderId, function (err, resp) {        if (err) throw err;
        res.json(resp);
    });
});

module.exports = leaderRouter;