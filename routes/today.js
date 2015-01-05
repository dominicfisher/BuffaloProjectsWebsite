var weatherImages = [
	"https://s3-us-west-2.amazonaws.com/buffaloweatherimages/fall.jpg",
	"https://s3-us-west-2.amazonaws.com/buffaloweatherimages/fall.jpg",
	"https://s3-us-west-2.amazonaws.com/buffaloweatherimages/fall.jpg",
	"https://s3-us-west-2.amazonaws.com/buffaloweatherimages/fall.jpg",
	"https://s3-us-west-2.amazonaws.com/buffaloweatherimages/fall.jpg",
	];

//TODO Add random number
var randomWeatherPosition = Math.floor(Math.random() * ((weatherImages.length - 1) - 0 + 1)) + 0;

exports.fetchTodaySummary = function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	var data = {
		"weatherImagePath": weatherImages[randomWeatherPosition],
		"whatwedid": "To make your life a little easier, we went ahead and told Andre and Kelley Happy Birthday.  I also updated some contact information for Adrienne Fisher and added a couple of todo's to your list.",
		"todosMeetingSummary": "Oh wow, you need to get your grove on, you have 4 meetings and three things to do today.",
		"todosMeetingSummaryIconPath" : null,
	};
	var output = {error:null, data:data};
	res.end(JSON.stringify(output) + "\n");
};

exports.fetchTodaySummmaryListings = function(req, res) {
	
	
	res.writeHead(200, {"Content-Type": "application/json"});
	var summaryItems =
		[
			
			
			]
	
	var output = {summaryItems:summaryItems};
	res.end(JSON.stringify(output) + "\n");
};