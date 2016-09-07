'use strict';
requirejs(["alarm"]);
requirejs(["weekDay"]);
requirejs(["time"]);

	var timeForm = document.getElementById("time-form");
	var timeInput = document.getElementById("time");
	var lightIntervall = document.getElementById("light-intervall");
	var weekDays = document.getElementsByName("weekday");

	// POST form data to server
	function validateForm() {
		var timeRegex = /^([0-1]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}$/;
		var minRegex = /^[0-5]{1}[0-9]{1}$/;

		var timeValue = timeInput.value;
		var intervalValue = lightIntervall.value;

		if ( !timeRegex.test(timeValue) ) {
			return false;
		}
		if ( intervalValue != "" ) {
			if ( !minRegex.test(intervalValue) ) {
				return false;
			}
		}
		return true;
	}

	// serialize form
	function serializeForm() {
		var alarm = new Alarm();

		// set time
		alarm.time = new Time(timeInput.value);
		alarm.lightIntervall = parseInt(lightIntervall.value);

		// set weekday
		for (var weekDay of weekDays) {
			if ( weekDay.checked ) {
				alarm.addWeekday(weekDay.id);
			}
		}

		return JSON.stringify(alarm);
	}

	function writeConfiguration() {
		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:3000/writeConfiguration', true);
		request.setRequestHeader("Content-Type", "application/json");

		var postData = serializeForm();

		console.log(postData)

		request.send(postData);
	}

// Ready Event
document.addEventListener("DOMContentLoaded", function(event) {
	timeForm.addEventListener("change", function(event) {
		if (validateForm()) {
			writeConfiguration();
		}
	});

});
