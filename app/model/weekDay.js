'use strict';

var WeekDay = (function(){
	function WeekDay(name, selected){
		this.name = name;
		this.selected = selected;
	}

	return WeekDay;
})();

module.exports = WeekDay;