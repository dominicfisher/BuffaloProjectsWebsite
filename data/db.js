var Db = require('mongodb').Db,
MongoClient = require('mongodb').MongoClient,
Server = require('mongodb').Server,
async = require('async');

var db = new Db('profilesdb', new Server('localhost', 27017));
var buffaloWeatherImages = db.collection("buffaloWeatherImages", function(err, buffaloWeatherImages) {
	if(err) {
		console.error(err);
		return;
	}
});

exports.init = function(callback) {
	async.waterfall([
		function(cb) {
			db.open(cb);
		},
		
		function(open_db, cb) {
			db.collection('buffaloimges', cb);
		},
		
		function(albums_coll, cb) {
			exports.buffaloimages = albums_coll;
			cb(null);
		}
		], callback);
};

exports.buffaloimages = null;