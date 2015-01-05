var constants = require('../.htconstants/constants');
var bcrypt = require('../node_modules/bcrypt/bcrypt');

exports.getProfileCreditials = function(submittedUsername, submittedPassword, key) {
	return getUID(submittedUsername, key) + getPID(submittedPassword, key);
}

function getUID(submittedUsername, key) {
	var username = '';
	var password = '';
	bcrypt.hash(key + submittedUsername, constants.constants.salts.user_username_salt, function(err, crypted) {
		username =  crypted;
		
		bcrypt.hash(key, constants.constants.salts.user_password_salt, function(err, crypted){
			password = crypted;
			
			var Db = require('mongodb').Db, 
			MongoClient = require('mongodb').MongoClient,
			Server = require('mongodb').Server;
		
			var db = new Db('userdb', new Server('localhost', 27017));
			db.auth(username, password);
			
			var users = db.users;
			var cursor = users.find().toArray();
			return cursor[0].uid;
			
		});
	});
}

function getPID(submittedPassword, key) {
	var username = '';
	var password = '';
	bcrypt.hash(key + submittedPassword, constants.constants.salts.pwd_username_salt, function(err, crypted) {
		username =  crypted;
		
		bcrypt.hash(key, constants.constants.salts.pwd_password_salt, function(err, crypted){
			password = crypted;
			
			var Db = require('mongodb').Db, 
			MongoClient = require('mongodb').MongoClient,
			Server = require('mongodb').Server;
		
			var db = new Db('userdb', new Server('localhost', 27017));
			db.auth(username, password);
			
			var pwds = db.pwdids;
			var cursor = pwds.find().toArray();
			return cursor[0].pid;
			
		});
	});
}
