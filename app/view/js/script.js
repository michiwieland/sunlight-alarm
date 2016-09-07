'use strict';
requirejs(['configuration']);
requirejs(['weekDay']);

document.addEventListener("DOMContentLoaded", function(event) {
	// serialize form
	function serializeForm() {
		var configuration = new Configuration();

		// set time
		var timeInput = document.getElementById("time");
		configuration.time = new Date(timeInput);

		// set weekday
		var weekDays = document.getElementsByName("weekday");
		for (var weekDay of weekDays) {
			if ( weekDay.checked ) {
				configuration.addWeekday(weekDay.id);
			}
		}

		// set duration
		var lightIntervall = document.getElementById("light-intervall");
		configuration.lightIntervall = new Date(lightIntervall);

		return JSON.stringify(configuration);
	}

	// POST form data to server
	function writeConfiguration() {
		var request = new XMLHttpRequest();
		request.open("POST", "http://localhost:3000/writeConfiguration", true);
		request.setRequestHeader("Content-Type", "application/json");

		var postData = serializeForm();
		request.send(postData);
	}

	// Event Listener
	var timeForm = document.getElementById("time-form");
	timeForm.addEventListener("change", function(event) {
		writeConfiguration();
	});

});
