



/*
 * GET users listing.
 */

var mysql = require('./mysql');
var ejs = require("ejs");
var crypto = require('crypto');


var hash = function (pass, salt) {
        var h = crypto.createHash('sha512');
        h.update(pass);
        h.update(salt);
        return h.digest('base64');
    };

    

exports.index = function(req, res){
  res.render('index', { title: 'CadB : index' });
};

exports.signin = function(req, res){
	res.render('signin', { title: 'CadB : signin' });
};

exports.navigate = function(req, res){
	res.send(true);
};
exports.signup = function(req, res){
	res.render('signup', { title: 'CadB : signup' });
};
exports.list = function(req, res){
	  res.send("respond with a resource");
	};

function usersignin(req, res){
	
	try{
		var email_id =  req.param("email_id");
		var password =  req.param("password");
		var newhash = hash(email_id,password);
		var query = "SELECT user_id from user where email='" + email_id + "' AND password='" + newhash + "';";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,results){
			try{
				if (!err){
					  if(results.length > 0){
						  if(results[0].user_id > 0){
							  req.session.email = email_id;
							  console.log("sign in successful");
							  res.code = "200";
							  res.value = {"result":results, "error": false, "message": ""};
							  res.send = ({"user":"valid"});						  
						  }	
						  else{
							  console.log("signin failed");
							  res.code = "500";
							  res.value = {"result":"", "error": true, "message": "No records found. Please enter valid username and password"};	
							  res.send = ({"user":"invalid"});
						  }					  
					  }
					  else{
						  console.log("signin failed");
						  res.code = "500";
						  res.value = {"result":"", "error": true, "message": "No records found. Please enter valid username and password"};		
						  res.send = ({"user":"invalid"});
					  }	
				  }
				  else{
					  console.log("signin failed");
					  res.code = "500";
					  res.value = {"result":"", "error": true, "message": err.message};	
					  res.send = ({"user":"valid"});
				  }
			} catch(err){
				res.code = "500";
				res.value = {"result":"", "error": true, "message": err.message};
				  res.send = ({"user":"valid"});
			}  
		},query);
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": "An error occured while signin."};
		  res.send = ({"user":"invalid"});
	}
}


function usersignup(req, res){
	
	try{
		var firstName = req.param("firstName");
		var lastName = req.param("lastName");
		var email_id =  req.param("email_id");
		var password =  req.param("password");
		var newHash = hash(email_id,password);
		var address = req.param("address");
		var street = req.param("street");
		var city = req.param("city");
		var state = req.param("state");
		var zip = req.param("zipcode");
		var phone = req.param("phone");
		var query = "INSERT INTO user (firstName, lastName, email, password, address, street, city, state, zipcode, phone) " +
				"VALUES('" +firstName+ "','" +lastName+ "', '" +email_id+ "', '" +newHash+ "', '" +address+ "', '" +street+ "', " +
						"'" +city+ "', '" +state+ "', '" +zip+ "', '" +phone+ "')";
		console.log("Query is:"+query);
		mysql.fetchData(function(err,results){
			try{
				if (!err){
					  req.session.email = email_id;
					  console.log("records fetched successfully");
					  
					  res.send = ({"signup":"success"});
				  }
				  else{
					  
					  console.log("error while fetching user profile details.");
					  res.code = "500";
					  res.value = {"result":"", "error": true, "message": err.message};		
					  res.send = ({"signup":"failed"});
				  }
			} catch(err){
				
				res.code = "500";
				res.value = {"result":"", "error": true, "message": err.message};
				res.send = ({"signup":"failed"});
			}  
		},query);	
	}
	catch(ex){
		var res = {};
		console.log(ex.message);
		res.code = "500";
		res.value = {"result":"", "error": true, "message": ex.message};
		res.send = ({"signup":"failed"});
	}
}

function successSignin(req,res)
{
	ejs.renderFile('./views/profile.ejs',function(err, result) {
        // render on success
        if (!err) {
        	
        	
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}


function failureSignin(req,res)
{
	ejs.renderFile('./views/index.ejs',function(err, result) {
        // render on success
        if (!err) {
        	alert("Signin Failed!! Try again !!");        	
            res.end(result);
        }
        // render or error
        else {
            res.end('An error occurred');
            console.log(err);
        }
    });
}








exports.usersignin = usersignin;
exports.usersignup = usersignup;
exports.successSignin = successSignin;
exports.failureSignin=failureSignin;