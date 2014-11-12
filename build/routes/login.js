exports.login = function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	var data = {
		userid 			: '12345',
		name 			: 'Chris Fisher',
		profilePicture 	: 'https://s3.amazonaws.com/buffaloimages/weather_profile_picture.png'
	};
	var output = {error:null, data:data};
	res.end(JSON.stringify(output) + "\n");
}