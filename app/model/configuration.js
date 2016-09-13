'use strict';

var Configuration = (function(){
	function Configuration(){
		this.alarms = [];
	}

	Configuration.prototype.addAlarm = function(){
		this.alarms.push(new Alarm());
	};

	return Configuration;
})();

define(function (require, exports, module) {

	exports = module.exports = Configuration;

});
