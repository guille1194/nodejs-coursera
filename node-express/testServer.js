var express = require('express'), morgan = require('morgan'), bodyParser = require('body-parser');
var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

var d = require('./dishRouter');
var p = require('./promoRouter');
var l = require('./leaderRouter');

app.use('/dishes',d.getDishRouter());
app.use('/promotions',p.getPromoRouter());
app.use('/leadership',l.getLeaderRouter());

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});