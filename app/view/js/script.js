'use strict';
requirejs(["configuration"]);
requirejs(["weekDay"]);

// Ready Event
document.addEventListener("DOMContentLoaded", function(event) {
	// Event Listener
	var timeForm = document.getElementById("time-form");
	var timeInput = document.getElementById("time");
	var lightIntervall = document.getElementById("light-intervall");
	var weekDays = document.getElementsByName("weekday");

	// POST form data to server
	function validateForm() {
		var timeRegex = /^([0-1]?[0-9]{1}|2[0-3]{1}):[0-5]{1}[0-9]{1}$/;

		var timeValue = timeInput.value;
		var intervalValue = lightIntervall.value;

		if ( !timeRegex.test(timeValue) ) {
			return false;
		}
		if (intervalValue != "") {
			if ( !timeRegex.test(intervalValue) ) {
				return false;
			}
		}
		return true;
	}

	// serialize form
	function serializeForm() {
		if (validateForm()) {
			var configuration = new Configuration();

			// set time
			configuration.time = timeInput.value;
			configuration.lightIntervall = lightIntervall.value;

			// set weekday
			for (var weekDay of weekDays) {
				if ( weekDay.checked ) {
					configuration.addWeekday(weekDay.id);
				}
			}

			return JSON.stringify(configuration);
		}
		return false;
	}

	function writeConfiguration() {
		var request = new XMLHttpRequest();
		request.open('POST', 'http://localhost:3000/writeConfiguration', true);
		request.setRequestHeader("Content-Type", "application/json");

		var postData = serializeForm();
		request.send(postData);
	}

	timeForm.addEventListener("change", function(event) {
			writeConfiguration();
	});

});
