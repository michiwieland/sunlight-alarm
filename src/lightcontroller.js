'use strict';

var child_process = require('child_process');

var LightController = (function(){
	function LightController(){
		this.controllerBinary = './bin/send-milight-cmd';
	}

	LightController.prototype.enlighten = function(){
		// TODO: Graceful
		this.sendCommand("5A AC 39 00 05 B3 F7");
	};

	LightController.prototype.off = function(){
		this.sendCommand("5A AC 39 00 09 B3 F7");
	};

	LightController.prototype.sendCommand = function(command){
		child_process.execFile(this.controllerBinary, [ command ]);
	};

	return LightController;
})();

exports = module.exports = LightController;
