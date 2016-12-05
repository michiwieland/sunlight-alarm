'use strict';
var Configurator = require('./configurator');

var express = require('express');
var path = require('path');

var Webserver = (function(){
	function Webserver(daemon) {
		this.daemon = daemon;
		this.app = express();
		this.server = null;

		this.setMiddleware();
		this.setRoutes();
		this.start();
	}

	Webserver.prototype.setMiddleware = function() {
		// body parser for POST requests
		var bodyParser = require('body-parser')
		this.app.use(bodyParser.json() );
		this.app.use(bodyParser.urlencoded({
		  extended: true
		}));

		// static serving
		this.app.use(express.static(path.join(__dirname, 'view')));
		this.app.use(express.static(path.join(__dirname, 'model')));
	}

	Webserver.prototype.setRoutes = function() {
		// Save configurations
		this.app.post('/api/v2/configuration', function(req, res){
			var configurator = new Configurator("configuration.json");
			configurator.writeConfig(req.body);
			this.daemon.reload();
			res.status(200).json({success: true});
		}.bind(this));

		// Load all available alarm configurations
		this.app.get('/api/v2/configuration', function(req, res){
			var configurator = new Configurator("configuration.json");
			res.json(configurator.readConfig());
		}.bind(this));
	}

	Webserver.prototype.start = function() {


		// Define the port to run on
		this.app.set('port', 3000);


		// Listen for requests
		this.server = this.app.listen(this.app.get('port'), function() {
		  var port = this.server.address().port;
		  console.log('Magic happens on port ' + port);
		}.bind(this));
	}

	return Webserver;
})();

module.exports = Webserver;
