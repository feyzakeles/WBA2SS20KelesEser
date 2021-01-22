var mysql = require('mysql');


//Create Connection
var db = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '12345678',
	database: 'car_sharing'
});

//Connect
db.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
});

module.exports = db;

