var express = require('express')
, weather_images = require('./routes/weather_images')
, http = require('http')
, path = require('path');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

var AWS = require('aws-sdk');
var Auth0 = require('auth0');
var extend = require('extend');

var api = new Auth0({
	domain:	'buffaloprojects.auth0.com',
	clientID:	'iGcC29FY463ceuL7OUNxwv1LUTQieXkn',
	clientSecret:	''
});

var CONNECTION = 'Username-Password-Authentication';


app.post('/create_user/', weather_images.create_user_document);
app.post('/get_user', weather_images.get_user_document);
app.post('/saveNewImage', weather_images.save_new_image)
app.post('/saveImage/', weather_images.save_image);
app.post('/deleteImage/', weather_images.delete_image);
app.post('save_profile_image'), weather_images.save_profile_image);
app.post('save_profile', weather_images.save_profile);
app.post('/custom-signup/', function(req, res) {
	
	var content = '';

	req.on('data', function (data) {
		content += data;
	});

	req.on('end', function () {
		var data = JSON.parse(content);
		console.log(data);
		
		var dataSend = extend(data, {connection:CONNECTION, email_verified:false});
		
		api.createUser(dataSend, function(err) {
			if(err) {
				console.log('Error creating user: ' + err);
				res.send(500, err);
				return;
			};
			
			res.send(200);
			return;
		});

	});

});

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