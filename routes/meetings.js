var date1 = new Date();
var date2 = new Date();
date2.setHours(date2.getHours() + 1, 15, 0, 0);
date2.setDate(date2.getDate() + 1);
date2.toGMTString();
var date3 = new Date();
date3.setHours(date3.getHours() + 2, 45, 0, 0);
date3.setDate(date3.getDate() +1);
date3.toGMTString();

var meetings = [
	{
		"meetingId"				:	"1234",
		"meetingDescription"	:	"TODAY Pickled four loko Brooklyn XOXO whatever. Asymmetrical paleo Thundercats.",
		"startDate"				:	date1.getTime()/1000,
		"endDate"				:	date1.getTime()/1000,
		"location"				:	"Location Text",
		"locationLatLon"		:	["12345.456", "1234.456"],
		"attendees"				:	[
			{
				"isAttending"	:	"Yes",
				"attendeeInfo"	:	"Adrienne Fisher"
			},
			{
				"isAttending"	:	"Yes",
				"attendeeInfo"	:	"Paul Gordon"
			},
			{
				"isAttending"	:	"Yes",
				"attendeeInfo"	:	"Chris Fisher"
			},
			{
				"isAttending"	:	"Yes",
				"attendeeInfo"	:	"Maddie Hill"
			}
			],
	},
	{
		"meetingId" 				: "1236",
		"meetingDescription" 		: "TOMORROW Kale chips mixtape 90's, kitsch stumptown letterpress Schlitz hella quinoa typewriter",
		"type"						: "meeting",
		"startDate" 				: date2.getTime()/1000,
		"endDate" 					: date3.getTime()/1000,
		"listItems"					: [],
		"locationName"				: "616 Dartmouth Kansas City, MO 64113",
		"locationLatLon"			: ["123.456", "123.456"]
		},
	{
		"meetingId" 				: "1237",
		"meetingDescription" 		: "TWO DAY AHEAD Vice fap. Dreamcatcher disrupt flannel, craft beer sriracha art party gentrify typewriter lo-fi you probably haven't heard of them aesthetic four loko.",
		"type"						: "meeting",
		"startDate" 				: date3.getTime()/1000,
		"endDate" 					: date3.getTime()/1000,
		"listItems"					: [],
		"locationName"				: "616 Dartmouth Kansas City, MO 64113",
		"locationLatLon"			: ["123.456", "123.456"]
		},
	];

exports.fetchMeetings = function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	var output = {meetings:meetings};
	res.end(JSON.stringify(output) + "\n");
};

exports.addMeeting = function(req, res) {
	meetings.push(req.data);
};

exports.updateMeeting = function(req, res) {
	var a = 0;
	var b = meetings.length;
	for(;a<b;a++) {
		if(meetings[a].meetingId == req.data.meetingId) {
			meetings.splice(a, 0, req.data);
		}
	}
};

exports.deleteMeeting = function(req, res) {
	var a = 0;
	var b = meetings.length;
	for(;a<b; b++){
		if(meetings[a].meetingId == req.data.meetingId){
			meetings.splice(a, 1);
			break;
		}
		
	}
};
