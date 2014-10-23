var express = require('express')
, login = require('./routes/login')
, http = require('http')
, path = require('path')
var app = express();
//app.use(express.bodyParser());

var AWS = require('aws-sdk');

AWS.config.loadFromPath('config.json');
app.post('/login/', login.login);
app.use(express.static(__dirname));
//app.use(app.router);

app.use(function(req, res) {
  // Use res.sendfile, as it streams instead of reading the file into memory.
  res.sendFile(__dirname + '/views/public/index.html');
});



var server = app.listen(3000, function() {
    console.log('Listening on port %d', server.address().port);
});