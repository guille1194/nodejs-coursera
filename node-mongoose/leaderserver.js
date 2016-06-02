var mongoose = require('mongoose'),assert = require('assert');

var Leaderships = require('./models/leadership');

// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Leaderships.create({
     "name": "Peter Pan",
     "image": "images/alberto.png",
     "designation": "Chief Epicurious Officer",
     "abbr": "CEO",
     "description": "Our CEO, Peter, . . ."
    } , function (err, promotion) {
    if (err) throw err;
    console.log('Promotion created!');
    console.log(promotion);

    var id = promotion._id;

    // get all the Leaderships
    setTimeout(function () {
      Leaderships.findByIdAndUpdate(id, {
          $set: {
            description: 'tomato'
          }
        }, {
          new: true
        })
        .exec(function (err, promotion) {
          if (err) throw err;
          console.log('Potato!');
          console.log(promotion);

          promotion.save(function (err, promotion) {
            console.log('Olives!');
            console.log(promotion);

            db.collection('leaderships').drop(function () {
              db.close();
            });
          });
        });
    }, 3000);
  });
});