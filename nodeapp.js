var express = require('express')
, weather_images = require('./routes/weather_images')
, http = require('http')
, path = require('path')
, profiles = require('./routes/profiles')
, user = require('./routes/user')
  , today= require('./routes/today')
  , todos = require('./routes/todo')
  , meetings = require('./routes/meetings')
  , contacts = require('./routes/contacts')
  , conversations = require('./routes/conversations');
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
app.post('/save_profile_image/', weather_images.save_profile_image);
app.post('/save_profile/', weather_images.save_profile);
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

//API
app.get('/users', user.list);

//app.get('/profiles.json', profiles.fetchProfile);
//app.post('/profiles/', profiles.createProfile);
//app.put('/profiles/:profileid', profiles.updateProfile);
//app.del('/profiles/', profiles.deleteProfile);

app.get('/today/summary/', today.fetchTodaySummary);
app.get('/today/summaryItems/', today.fetchTodaySummmaryListings);

app.get('/todos/', todos.fetchAllToDos);
app.post('/todos/', todos.addToDo);
app.put('/todos/', todos.updateToDo);
app.delete('/todos/', todos.removeToDo);

app.get('/meetings/', meetings.fetchMeetings);
app.post('/meetings/', meetings.addMeeting);
app.put('/meetings/', meetings.updateMeeting);
app.delete('/meetings/', meetings.deleteMeeting);

app.get('/contacts/', contacts.fetchContacts);
app.get('/contacts/topFriends/', contacts.fetchTopFriends);
app.get('/contacts/recentFriends/', contacts.fetchRecentFriends);
app.get('/contacts.topColleagues/', contacts.fetchTopColleagues);
app.get('/contacts.recentColleagbues', contacts.fetchRecentColleagues);
app.post('/contacts/', contacts.addContact);
app.put('/contacts/', contacts.updateContact);
app.delete('/contacts/', contacts.deleteContact);

app.get('/conversations/', conversations.fetchConversations);
app.post('/conversations/', conversations.addConversation);
app.put('/conversations/', conversations.updateConversation);
app.delete('/conversations/', conversations.deleteConversation);

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
	} else {
        console.log('Server started -- lets got');
    }
	
	app.listen(3000);
});