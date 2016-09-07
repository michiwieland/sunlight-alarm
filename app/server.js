var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

var fs = require("fs");

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

//
app.post('/writeConfiguration', function(req, res){
	console.log(req);

	console.log(req.body.time);

	fs.writeFile("configuration.json", req.body.time, function(err){
		if (err) {
			return console.log(err);
		} else {
			res.send(200);
		}
	});

});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
