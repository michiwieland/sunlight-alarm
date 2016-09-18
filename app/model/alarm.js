'use strict';

var Alarm = (function(){
	function Alarm() {
		this.name;
		this.selected;
		this.time;
		this.enlightDuration;
		this.lightDuration;
		this.weekDays = [];
	}

	Alarm.prototype.addWeekday = function(name, selected){
		this.weekDays.push(new WeekDay(name, selected));
	};

	return Alarm;
})();

define(function (require, exports, module) {

	exports = module.exports = Alarm;

});
