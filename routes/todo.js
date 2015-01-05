var date1 = new Date();
var date2 = new Date();
date2.setHours(date2.getHours() + 1, 15, 0, 0);
date2.setDate(date2.getDate()+1);
date2.toGMTString();
var date3 = new Date();
date3.setHours(date3.getHours() + 2, 45, 0, 0);
date3.setDate(date3.getDate()+2);
date3.toGMTString();
var date4 = date1;
date4.setHours(date4.getHours() + 1, 45, 0, 0);
var todos = [
			{
				"todoid" 	: "1234",
				"type"				: "todo",
				"todo" 		: "TODAY Pickled four loko Brooklyn XOXO whatever. Asymmetrical paleo Thundercats.",
				"listItems"			: [],
				"startDate" 		: date1.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1235",
				"todo" 		: "TOMORROW Pitchfork small batch bitters sriracha scenester locavore you probably haven't heard of them.",
				"type"				: "todo",
				"startDate" 		: date2.getTime()/1000,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1236",
				"todo" 		: "TWO DAYS FROM TODAY Photo booth disrupt Brooklyn, cred iPhone art party Pinterest. Farm-to-table selfies squid, photo booth, Tumblr put a bird on it yr mlkshk roof party quinoa small batch",
				"type"				: "todo",
				"startDate" 		: date3.getTime()/1000,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			
			{
				"todoid" 	: "1237",
				"todo" 		: "NO START DATE Raw denim ethical keffiyeh Shoreditch. Brooklyn squid YOLO gentrify twee try-hard meggings cardigan gluten-free 3 wolf moon fashion axe Blue Bottle.",
				"type"				: "todo",
				"startDate" 		: null,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: null,
				"locationLatLon"	: null,
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1238",
				"todo" 		: "NO START DATE Ugh ennui normcore, artisan meggings biodiesel dreamcatcher aesthetic irony Kickstarter Banksy pork belly.",
				"type"				: "todo",
				"startDate" 		: null,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1239",
				"todo" 		: "NO START DATE Ugh ennui normcore, artisan meggings biodiesel dreamcatcher aesthetic irony Kickstarter Banksy pork belly.",
				"type"				: "todo",
				"startDate" 		: null,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1240",
				"todo" 		: "NO START DATE normcore, artisan meggings biodiesel dreamcatcher aesthetic irony Kickstarter Banksy pork belly.",
				"type"				: "todo",
				"startDate" 		: null,
				"endDate" 			: null,
				"listItems"			: [],
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1241",
				"type"				: "todo",
				"todo" 		: "Mixtape vinyl asymmetrical church-key forage. Chillwave hashtag Pitchfork plaid artisan. ",
				"listItems"			: [],
				"startDate" 		: date1.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1242",
				"type"				: "todo",
				"todo" 		: "Mixtape sustainable cred 3 wolf moon, flannel swag irony pickled. Carles Tonx retro Wes Anderson lo-fi seitan chambray quinoa flannel Kickstarter, meh kogi food truck cred. ",
				"listItems"			: [],
				"startDate" 		: date1.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1243",
				"type"				: "todo",
				"todo" 		: "Yr retro flexitarian YOLO American Apparel, bespoke readymade organic Kickstarter mixtape distillery Bushwick scenester. Vice readymade Williamsburg food truck viral. PBR&B hoodie Vice you probably haven't heard of them, Shoreditch Portland butcher.",
				"listItems"			: [],
				"startDate" 		: date1.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1244",
				"type"				: "todo",
				"todo" 		: "Crucifix Kickstarter slow-carb, selvage semiotics irony readymade next level single-origin coffee fixie shabby chic sriracha butcher yr. ",
				"listItems"			: [],
				"startDate" 		: date1.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1245",
				"type"				: "todo",
				"todo" 		: "Distillery slow-carb before they sold out ugh, occupy kale chips chambray typewriter drinking vinegar messenger bag Banksy fingerstache craft beer locavore Echo Park.  ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1246",
				"type"				: "todo",
				"todo" 		: "Slow-carb tousled 3 wolf moon crucifix, narwhal umami hella.  ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1247",
				"type"				: "todo",
				"todo" 		: "Flexitarian next level single-origin coffee, sartorial cardigan deep v organic twee Austin tofu seitan keytar.  ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1248",
				"type"				: "todo",
				"todo" 		: "Leggings Odd Future Intelligentsia, paleo keytar sriracha single-origin coffee Bushwick XOXO Austin bitters cornhole Carles semiotics. ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1249",
				"type"				: "todo",
				"todo" 		: "Pour-over pickled scenester Marfa hashtag single-origin coffee. Helvetica shabby chic tousled ugh distillery try-hard. ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
			{
				"todoid" 	: "1250",
				"type"				: "todo",
				"todo" 		: "Before they sold out craft beer salvia swag, lomo Echo Park PBR selvage beard leggings seitan.  ",
				"listItems"			: [],
				"startDate" 		: date4.getTime()/1000,
				"endDate" 			: null,
				"locationName"		: "616 Dartmouth Kansas City, MO 64113",
				"locationLatLon"	: ["123.456", "123.456"],
				"isComplete"		:	false
				},
		];

exports.fetchAllToDos = function(req, res) {
	res.writeHead(200, {"Content-Type": "application/json"});
	var output = {data:todos};
	res.end(JSON.stringify(output) + "\n");
};

exports.addToDo = function(req, res) {
	todos.push(req.data);
};

exports.updateToDo = function(req, res) {
	var a = 0;
	var b = todos.length;
	for(;a<b;a++) {
		if(todos[a].todoid == req.data.todoid) {
			todos.splice(a, 0, todos[a]);
			break;
		}
	}
};

exports.removeToDo = function(req, res) {
	
	var a = 0;
	var b = todos.length;
	for(;a<b;a++) {
		if(todos[a].todoid == req.data.todoid) {
			todos.splice(a, 1);
			break;
		}
	}
};