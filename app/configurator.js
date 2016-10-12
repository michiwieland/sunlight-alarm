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

	Configurator.prototype.getAlarmCronTime = function(alarm) {
		var hour = alarm.time.hours;
		var minute = alarm.time.minutes;
		var weekdays_array = [];
		for(var day of alarm.weekDays) {
			if(day.selected === false) continue;

			var daynum;
			switch(day.name) {
				case "sunday":
					daynum = 0; break;
				case "monday":
					daynum = 1; break;
				case "tuesday":
					daynum = 2; break;
				case "wednesday":
					daynum = 3; break;
				case "thursday":
					daynum = 4; break;
				case "friday":
					daynum = 5; break;
				case "saturday":
					daynum = 6; break;
			}
			weekdays_array.push(daynum);
		}
		weekdays_array.sort();
		var weekdays = weekdays_array.join();

		return "0 " + minute + " " + hour + " * * " + weekdays;
	}

	return Configurator;
})();

module.exports = Configurator;
