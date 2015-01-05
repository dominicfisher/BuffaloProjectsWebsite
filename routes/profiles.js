var constants = require('../.htconstants/constants');
var bcrypt = require('../node_modules/bcrypt/bcrypt');
var auths = require('../htauth/auth');

var dwkey = '';
var dkey = '';
var submitted_username = '';
var submitted_password = '';
var profile;

var userdbusername = '';
var userdbpassword = '';
var uid = '';
var pwdid = '';
var mailbox = '';

var pwddbusername = '';
var pwddbpassword = '';
		
exports.create = function(req, res) {
	
	var dwkey = req.dwkey;
	var dkey = req.dkey;
	var submitted_username = req.username;
	var submitted_password = req.pword;
	var profile = req.profile;
		
	bcrypt.hash(dwkey + submitted_username, constants.constants.salts.user_username_salt, function(err, crypted) {
		userdbusername = crypted;
			
		bcrypt.hash(dwkey, constants.constants.salts.user_password_salt, function(err, crypted){
			userdbpassword = crypted;
			
			bcrypt.hash(dwkey + submitted_password, constants.constants.salts.pwd_username_salt, function(err, crypted) {
				pwddbusername = crypted;
				
				bcrypt.hash(dwkey, constants.constant.salts.pwd_password_salt, function(err, crypted){
					pwddbpassword = crypted;
				
			
			
					if( !userExists(userdbusername, userdbpassword) ) {
						
						createUser(profile);
						
					} else {
						return createError("user_001","This user already exists.");
					}
				});
			});
		});
	});

};

exports.update = function(req, res) {
	
	//Add Streaming code for josn object
	var json_body = '';
	
	req.on(
			'readable', 
			function() {
				var d = req.read();
				if(d) {
					if(typeof d == "string") {
						json_body += d;
					} else if(typeof d == 'object' && d instanceof Buffer) {
						json_body += d.toString('utf8');
					}
				}
			}
		);
	
	req.on (
			'end',
			function() {
				if(json_body) {
					try {
						var body = JSON.parse(json_body);
						var profileUsername = auths.getProfileCreditials(req.params.username, req.params.password, req.params.dwkey);
						execute_profile_update(body, profileUsername, req.params.dwkey);
					} catch(e) {
						
					}
				} else {
					
				}
			}
		);
};

function execute_profile_update(jsonobject, username, password) {
	var Db = require('mongodb').Db, 
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

	var db = new Db('profilesdb', new Server('localhost', 27017));
	db.auth(username, password);
	
	var creditials = fetchProfileCreditials(jsonObject.username, jasonObject.password);
	db.auth(creditials.username, creditials.password);
	db.profile.update({"profileid" : creditials.profileid}, jsonObject.profile)
}

function createUser() {
	
	var Db = require('mongodb').Db, 
		MongoClient = require('mongodb').MongoClient,
		Server = require('mongodb').Server;
	
	var db = new Db('userdb', new Server('localhost', 27017));
	db.auth(constants.constants.passwords.admin_usr, 'constants.constants.passwords.admin_pwd');
	
	db.open(function(err, db) {
		if(err) { return console.log(err); }
		
		console.log("Opened database");
		// TODO:Roles need to be created
		
		db.createUser({
			 user: userdbusername,
			 pwd: userdbpassword,
			roles: [
				{
				role: "changeOwnCustomData",
				db: "userdb"
				}
				]
		}, function (err, result) {
			if(err) {return console.log(err);}
			console.log("Added");
		});
		
		var newuserid = uuid();
		
		bcrypt.genSalt(10, newuserid, function(err, salt) {
			bcrypt.hash(newuserid, salt, function(err, crypted) {
				uid = crypted;
				newuser = {uid : crypted};
				
				db.users.insert(newuser, {safe:true}, function(err, inserted_doc) {
					if(err && err.name == "MongoError" && err.code == 11000) {
						console.log("This user exists, we have a problem");
						return;
					} else if (err) {
						console.log("We have a problem");
						return;
					}
					db.close();
					createPassword();
				});
			});
		});
	});
	
}

function createPassword() {
	var Db = require('mongodb').Db, 
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

	var db = new Db('pwddb', new Server('localhost', 27017));
	db.auth(constants.constants.passwords.admin_usr, 'constants.constants.passwords.admin_pwd');
	
	db.open(function(err, db) {
		if(err) { return console.log(err); }
		
		console.log("Opened database");
		// TODO:Roles need to be created
		
		db.createUser({
			 user: pwddbusername,
			 pwd: pwddbpassword,
			roles: [
				{
				role: "changeOwnCustomData",
				db: "userdb"
				}
				]
		}, function (err, result) {
			if(err) {return console.log(err);}
			console.log("Added");
		});
		
		var newpasswordid = uuid();
		
		bcrypt.genSalt(10, newpasswordid, function(err, salt) {
			bcrypt.hash(newpasswordid, salt, function(err, crypted) {
				pwdid = crypted;
				newpwdid = {pid : crypted};
				
				db.pwdids.insert(newpwdid, {safe:true}, function(err, inserted_doc) {
					if(err && err.name == "MongoError" && err.code == 11000) {
						console.log("This user exists, we have a problem");
						return;
					} else if (err) {
						console.log("We have a problem");
						return;
					}
					db.close();
					createProfile();
				});
			});
		});
	});
}

function createProfile() {
	var Db = require('mongodb').Db, 
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

	var db = new Db('profilesdb', new Server('localhost', 27017));
	db.auth(constants.constants.passwords.admin_usr, constants.constants.passwords.admin_pwd);
	
	db.open(function(err, db) {
		if(err) { return console.log(err); }
		
		console.log("Opened database");
		// TODO:Roles need to be created
		
		db.createUser({
			 user: uid + pwdid,
			 pwd: dwkey,
			roles: [
				{
				role: "changeOwnCustomData",
				db: "profilesdb"
				}
				]
		}, function (err, result) {
			if(err) {return console.log(err);}
			console.log("Added");
		});
		
		
		
		bcrypt.hash(uid + pwdid, constants.constants.salts.profile_id_salt, function(err, crypted) {
			newprofile = {profileid : crypted,
							mailbox :uuid()
				};
			
			db.profiles.insert(newprofile, {safe:true}, function(err, inserted_doc) {
				if(err && err.name == "MongoError" && err.code == 11000) {
					console.log("This user exists, we have a problem");
					return;
				} else if (err) {
					console.log("We have a problem");
					return;
				}
				db.close();
				
			});
		});

	});
}

function userExists(usr, pwd) {
	//Check userdb to see if user already exists
	var Db = require('mongodb').Db, 
	MongoClient = require('mongodb').MongoClient,
	Server = require('mongodb').Server;

	var db = new Db('userdb', new Server('localhost', 27017));
	return db.auth(usr, pwd); 
}

function fetchProfileCreditials(dwkey, username, password) {
	
}

function createError(errorNo, errorMessage) {
	
}