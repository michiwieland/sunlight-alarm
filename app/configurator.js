'use strict';

var fs = require('fs');

var Configurator = (function () {
	function Configurator(file) {
		this.file = file;
	}

	// Methods
	Configurator.prototype.readConfig = function(){
		return JSON.parse(fs.readFileSync(this.file));
	}

  Configurator.prototype.writeConfig = function(data) {
		var dataString = JSON.stringify(data);
		return fs.writeFileSync(this.file, dataString);
  }

	return Configurator;
})();

exports = module.exports = Configurator;
