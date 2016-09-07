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

exports = module.exports = Configuration;
