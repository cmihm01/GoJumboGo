var express = require('express');
var favicon = require('serve-favicon');
var app = express();
var path = require('path');

var bodyParser = require('body-parser'); // Required if we need to use HTTP query or post parameters
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/favicon.ico'));
//app.use("/styles",  express.static(__dirname + '/public/stylesheets'));
//app.use("/scripts", express.static(__dirname + '/public/javascripts'));
app.use("/img",  express.static(__dirname + '/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || "mongodb://localhost/users";

var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	if(error){
		console.log('error!');
	}
	db = databaseConnection;
});
// views is directory for all template files
//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

//app.set('views', __dirname + '/views');
//app.set('view engine', 'html');

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname + '/index.html'))
});

app.get('/logins.json', function(request, response) {
	var targetName = request.param("username");
    response.setHeader('Content-Type', 'application/json');

    // REMOVE SPECIAL CHARACTERS FROM USERNAME PARAM

	db.collection('users', function(er, collection) {
		collection.find({username: targetName}).toArray(function(err, result) {
			if (!err) {
				response.json(result);
			} else {
				response.send('Whoops, something went terribly wrong!');
			}
		});
	});
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
		"time":time,
		"times_played":0
	};
	//checks if any fields undefined
	//if not, calls to database
	//stores info in database
	if(name != undefined){
		db.collection('users', function(error, coll) {
			if (error){
				console.log("Whoops, something went terribly wrong!");
			}
			else{
				//inserts data
				coll.insert(toInsert, function(error, saved) {
					if (error) {
						response.send(500);
					}
					else {
						console.log("all good");
						response.send(200);
					}
			    });
			}
		});
	}

});
app.post('/times.json', function(request, response) {
	console.log("in times.json");
	//stores name, score, and grid from request 
	var name = request.body.username;
	//generates time stamp
	var time = new Date();

	//allows for CORS
	response.header('Access-Control-Allow-Origin', '*');
	response.header('Access-Control-Allow-Headers', 'X-Requested-With');
	
	//checks if any fields undefined
	//if not, calls to database
	//stores info in database
	if(name != undefined){
		db.collection('users', function(error, coll) {
			if (error){
				console.log("Whoops, something went terribly wrong!");
			}
			else{
				//inserts data
				coll.update({username:"name"},
					{$inc:{times_played:1}});
				console.log("Sent times");
					response.send(200);
			}
		});
	}

});
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


