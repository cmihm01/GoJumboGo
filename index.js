var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var path = require('path');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
//app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/img",  express.static(__dirname + '/img'));

/*
var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL;

var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	if(error){
		console.log('error!');
	}
	db = databaseConnection;
});*/
// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'))
});

app.post('/submit.json', function(request, response) {
	//stores name, score, and grid from request 
	var name = request.body.username;

	//generates time stamp
	var time = new Date();

	//allows for CORS
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	
	//creates JSON file of data
	var toInsert = {
		"username": name,
		"time":time
	};
	//checks if any fields undefined
	//if not, calls to database
	//stores info in database
	if(name != undefined){
		db.collection('users', function(error, coll) {
			if (error){
				console.log("couldn't find database");
			}
			else{
				//inserts data
				coll.insert(toInsert, function(error, saved) {
					if (error) {
						response.send(500);
					}
					else {
						response.send(200);
					}
			    });
			}
		});
	}
	// else{
	// 	response.send(500);
	// }

});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


