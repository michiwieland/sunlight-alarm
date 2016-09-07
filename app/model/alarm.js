'use strict';

var Alarm = (function(){
	function Alarm() {
		this.name;
		this.time;
		this.lightIntervall;
		this.weekDays = [];
	}

	Alarm.prototype.addWeekday = function(name){
		this.weekDays.push(new WeekDay(name));
	};

	return Alarm;
})();

exports = module.exports = Alarm;
