'use strict';

Handlebars.registerHelper('leading-zero', function(value) {
	var sVal = value.toString();
	return (sVal.length < 2) ? ("0" + sVal) : sVal;
});
