'use strict';
var Configurator = require('./configurator');

var express = require('express');
var path = require('path');
var app = express();

// body parser for POST requests
var bodyParser = require('body-parser')
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({
  extended: true
}));

// Define the port to run on
app.set('port', 3000);
app.use(express.static(path.join(__dirname, 'view')));
app.use(express.static(path.join(__dirname, 'model')));

// Save configurations
app.post('/saveConfiguration', function(req, res){
	var configurator = new Configurator("configuration.json");
	configurator.writeConfig(req.body);
	res.status(200).send({success: true});
});

// Load all available alarm configurations
app.get('/loadConfigurations', function(req, res){
	var configurator = new Configurator("configuration.json");
	res.json(configurator.readConfig());
});

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
