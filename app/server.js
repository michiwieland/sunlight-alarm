'use strict';
var Configurator = require('./configurator');

var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

// Define the port to run on
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'model')));

//
app.post('/writeConfiguration', function(req, res){
	console.log(req.body);

	var configurator = new Configurator();
	configurator.writeConfig(req.body);

});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
