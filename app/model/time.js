'use strict';

var Time = (function(){
	function Time(timeString){
		this.parseTime(timeString);
	}

	Time.prototype.parseTime = function(timeString){
		var timeParts = timeString.split(":");
		this.hours = parseInt(timeParts[0]);
		this.minutes = parseInt(timeParts[1]);
	};

	return Time;
})();

module.exports = Time;