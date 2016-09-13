'use strict';

var WeekDay = (function(){
	function WeekDay(name, selected){
		this.name = name;
		this.selected = selected;
	}

	return WeekDay;
})();

define(function (require, exports, module) {

	exports = module.exports = WeekDay;

});
