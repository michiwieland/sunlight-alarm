'use strict';

var Alarm = (function(){
	function Alarm(){
		this.configurations = [];
	}

	Configuration.prototype.addConfiguration = function(){
		this.weekDays.push(new Configuration(name));
	};

	return Alarm;
})();

exports = module.exports = Alarm;
