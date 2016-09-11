'use strict';

var Alarm = (function(){
	function Alarm() {
		this.name;
		this.selected;
		this.time;
		this.lightIntervall;
		this.weekDays = [];
	}

	Alarm.prototype.addWeekday = function(name, selected){
		this.weekDays.push(new WeekDay(name, selected));
	};

	return Alarm;
})();

exports = module.exports = Alarm;
