var mysql = require('mysql');
var mysql = require('mysql');
var poolStack = [];
var maxSizeOfPool = 200; 
var myVar = 0;

for(var i = 0; i < maxSizeOfPool; i++){
	var conn = getConnection();
	poolStack.push(conn);
}

function getConnection(){
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : 'sMileplz007',
		database : 'cadb'
	});
	return connection;
}

function getConnectionFromPool(){
	var conn = poolStack.pop();
	return conn;
}

function releaseConnection(conn){
	poolStack.push(conn);
}

function fetchData(callback,sqlQuery){	
	console.log("\nSQL Query::"+sqlQuery);	
	var connection = getConnectionFromPool();
	connection.query(sqlQuery, function(err, rows) {
		if(err){
			console.log("ERROR: " + err.message);
		}
		else 
		{	// return err or result
			
			console.log("DB Results:"+rows);
			releaseConnection(connection);
			callback(err, rows);
			
		}
	});	
}	

exports.fetchData=fetchData;