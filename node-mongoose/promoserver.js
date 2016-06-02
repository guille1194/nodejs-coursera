var mongoose = require('mongoose'),assert = require('assert');

var Promotions = require('./models/promotions');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Promotions.create({
    name: '1',
    image: '2.jpg',
    price: '3.1',
    description: 'Potato'
  }, function (err, promotion) {
    if (err) throw err;
    console.log('tomato!');
    console.log(promotion);

    var id = promotion._id;

    // get all the Promotions
    setTimeout(function () {
      Promotions.findByIdAndUpdate(id, {
          $set: {
            description: 'Updated Test'
          }
        }, {
          new: true
        })
        .exec(function (err, promotion) {
          if (err) throw err;
          console.log('Pumpkin!');
          console.log(promotion);

          promotion.save(function (err, promotion) {
            console.log('Brinjal!');
            console.log(promotion);

            db.collection('promotions').drop(function () {
              db.close();
            });
          });
        });
    }, 3000);
  });
});