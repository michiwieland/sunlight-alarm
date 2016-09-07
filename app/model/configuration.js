'use strict';

var Configuration = (function(){
	function Configuration(){
		this.time;
		this.lightIntervall;
		this.weekDays = [];
	}

	Configuration.prototype.addWeekday = function(name){
		this.weekDays.push(new WeekDay(name));
	};

	return Configuration;
})();

exports = module.exports = Configuration;
