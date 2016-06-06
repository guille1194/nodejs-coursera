var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Favourites = require('../models/favourites');

var favouriteRouter = express.Router();
favouriteRouter.use(bodyParser.json());
var Verify = require('./verify');

favouriteRouter.route('/')
.all(Verify.verifyOrdinaryUser)
.get(function(req, res, next){
	Favourites.findOne({postedBy: req.decoded._doc._id})
	.populate('postedBy')
	.populate('dishes')
	.exec(function(err, favourite){
		if(err)
			throw err;
		res.json(favourite);
	});
})
.delete(function(req, res, next){
	Favourites.remove({postedBy: req.decoded._doc._id}, function(err, favourite){
		if(err)
			throw err;
		res.json(favourite);
	});
})
.post(function(req, res, next){
	Favourites.findOne({postedBy: req.decoded._doc._id}, function(err, favourite){
		if(err)
			throw err;
		if(!favourite)
		{
			Favourites.create({postedBy: req.decoded._doc._id, dishes: []}, function(err, favourite){
				if(err)
					throw err;
				favourite.dishes.push(req.body._id);
				favourite.save(function(err, favourite){
					if(err)
						throw error;
					console.log('Initialized favourites');
					res.json(favourite);
				});
			});
		}
		else
		{
			var flag=0;
			for(i=0;i<favourite.dishes.length;i++)
				if(favourite.dishes[i] == req.body._id)
					flag=1;
			if(flag==0)
			{
				favourite.dishes.push(req.body._id);
				favourite.save(function(err, favourite){
					if(err)
						throw error;
					console.log('Initialized favourites');
					res.json(favourite);
				});
			}
			else
				console.log('Already in favourites');
		}
	});
});

favouriteRouter.route('/:favouriteId')
.delete(Verify.verifyOrdinaryUser, function(req, res, next){
	Favourites.findOne({postedBy: req.decoded._doc._id}, function(err, favourite){
		if(err)
			throw err;
		if(!favourite)
			console.log('No favourites!');
		else
		{
			if(err)
				throw err;
			if(!favourite)
				console.log('No favourites!');
			else
			{
				var flag=0,pos=-1,temp=req.params.favouriteId;
				for(i=0;i<favourite.dishes.length;i++)
					if(favourite.dishes[i] == temp)
						flag=1,pos=i;
				if(pos==-1)
					console.log(id+'not present in favourites');
				else
					favourite.dishes.splice(pos,1);
				favourite.save(function(err, favourite){
					if(err)
						throw error;
					console.log('Removed from favourites');
					res.json(favourite);
				});
			}
		}
	});
});

module.exports=favouriteRouter;