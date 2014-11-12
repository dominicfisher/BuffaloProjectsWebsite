exports.create_user_document = function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});

	var content = '';

	req.on('data', function (data) {
		content += data;
	});

	req.on('end', function () {
		var data = JSON.parse(content);

		var translated_user = translate_user(data.user);
		buffaloWeatherImages.find({translated_user : image.translated_user}).toArray(function(err, items){
			data = {
				translated_id : translated_user,
				images	: items
			}
			var output = {error:null, data:data};
			res.end(JSON.stringify(output) + "\n");
		})
	});
}

exports.save_image = function(req, res) {

	var db = require('../data/db.js');
	var buffaloWeatherImages = db.buffaloimages

	res.writeHead(200, {"Content-Type": "application/json"});
	var data;

	var content = '';

	req.on('data', function (data) {
		content += data;
	});

	req.on('end', function () {
		var data = JSON.parse(content);

		var translated_user = data.translated_user;
		var image = data.image;

		buffaloWeatherImages.insert(image, {w:1, safe:true}, function(err, inserted_doc) {
			if(err && err.name == "MongoError" && err.code == 11000) {
				//Album already exists
				console.log('document already exists');
				buffaloWeatherImages.update({path : image.path},{$set:{season:image.season, lat:image.lat, lon:image.lon, address:image.address, tags:image.tags}}, {safe: true}, function(err, inserted_doc) {
					console.log(err)
					console.log('updated image')
					buffaloWeatherImages.find({path : image.path}).toArray(function(err, items){
							var output = {error:null, data:items};
							res.end(JSON.stringify(output) + "\n");
					})
				})
				return
			} else if (err) {
				console.log('something bad happened');
				console.log(err);
				error = "Something bad happened";
				var output = {error:null, data:data};
				res.end(JSON.stringify(output) + "\n");
				return
			} else {
				console.log('made new image');
				buffaloWeatherImages.find({path : image.path}).toArray(function(err, items){var output = {error:null, data:items};
						res.end(JSON.stringify(output) + "\n");
				})
			}
		})
	});

}

exports.delete_image = function(req, res) {
	var db = require('../data/db.js');
	var buffaloWeatherImages = db.buffaloimages

	res.writeHead(200, {"Content-Type": "application/json"});
	var data;

	var content = '';

	req.on('data', function (data) {
		content += data;
	});

	req.on('end', function () {
		var data = JSON.parse(content);
		var image = data.image;
		
		buffaloWeatherImages.remove({_id:image.path});
		var output = {error:null, data:'done'};
		res.end(JSON.stringify(output) + "\n");
	}
}


function translate_user(user) {
	var translate_array = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", ]
	var user_split = user.split("@")
	var new_user = user_split[0] + user_split[1];
	user_split = new_user.split(".");
	new_user = ''
		for(var a = 0; a<user_split.length-1; a++) {
			new_user = new_user + user_split[a]
		}

	var translate_user = '';
	for(var b = 0; b<new_user.length-1; b++) {
		var translatedCharacter = new_user[b]
		if(translate_array.indexOf(new_user[b])) {
			translateCharacter = translate_array.indexOf(new_user[b]).toString(); 
		}
		translate_user = translate_user + translateCharacter;
	}

	return translate_user;
}
