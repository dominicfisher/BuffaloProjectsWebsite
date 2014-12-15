var express = require('express')
, weather_images = require('./routes/weather_images')
, http = require('http')
, path = require('path');
var app = express();
//app.use(express.bodyParser());

var AWS = require('aws-sdk');


app.post('/create_user/', weather_images.create_user_document);
app.post('/saveImage/', weather_images.save_image);
app.post('/deleteImage/', weather_images.delete_image);
app.use(express.static(__dirname));
app.disable('etag');
//app.use(app.router);

app.use(function(req, res) {

  res.sendFile(__dirname + '/index.html');
});



var db = require('./data/db.js');
db.init(function(err, results) {
	if(err) {
		console.error("FATAL ERROR ON START");
		console.error(err);
		process.exit(1);
	}
	
	app.listen(3000);
});