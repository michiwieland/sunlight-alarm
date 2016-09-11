'use strict';
var Configurator = require('./configurator');

var express = require('express');
var path = require('path');
var app = express();

var bodyParser = require('body-parser')
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Define the port to run on
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'model')));

// Save a single alarm configuration
app.post('/saveConfiguration', function(req, res){
	console.log(req.body);

	var configurator = new Configurator("configuration.json");
	configurator.writeConfig(req.body);
});

// Load all available alarm configurations
app.get('/loadConfigurations', function(req, res){
	var configurator = new Configurator("configuration.json");
	var json = JSON.stringify(configurator.readConfig());
	res.end(json);
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
