'use strict';

var WeekDay = (function(){
	function WeekDay(name, selected){
		this.name = name;
		this.selected = selected;
	}

	return WeekDay;
})();

exports = module.exports = WeekDay;
