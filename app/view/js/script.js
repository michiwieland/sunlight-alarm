'use strict';
requirejs(["alarm"]);
requirejs(["weekDay"]);
requirejs(["time"]);

var currentConfiguration;

// serialize form
function storeChanges() {
	var alarm = getCurrentAlarm();

	// set time
	alarm.time = new Time($("#time").val());
	alarm.lightIntervall = parseInt($("#light-intervall").val());

	// set weekday
	for (var weekDay of alarm.weekDays) {
		weekDay.selected = $("#" + weekDay.name).is(':checked');
	}
}

function saveConfiguration() {

	// store changes in global object
	storeChanges();

	// send json string to server
	var postData = JSON.stringify(currentConfiguration);
	$.ajax({
		url: "http://localhost:3000/saveConfiguration",
		type:"POST",
		data:postData,
		contentType:"application/json; charset=utf-8",
		dataType:"json"
	});
}

function loadConfigurations() {

	// load available configurations from server
	$.getJSON("http://localhost:3000/loadConfigurations", function(serverConfiguration){

		// load template and compile
		$.get('templates/configurations.handlebars', function (templateSource) {
	    var template = Handlebars.compile(templateSource);
			currentConfiguration = serverConfiguration;
			var view = template({configurations: currentConfiguration.alarms});
	    $("#configurations").html(view);

			// load alarm for selected configuration
			loadAlarm($("#configurations").val());
		}, 'html')
	});
}

function loadAlarm(name) {
	var selectedAlarm = getCurrentAlarm();

	$.get('templates/alarm.handlebars', function (templateSource) {
		var template = Handlebars.compile(templateSource);
		var view = template({alarm: selectedAlarm});
		$("#alarms").html(view);
	}, 'html')
}

function getCurrentAlarm() {
	for (var alarm of currentConfiguration.alarms) {
		if ( alarm.name === $("#configurations").val() ) {
			alarm.selected = true;
			return alarm;
		} else {
			alarm.selected = false;
		}
	}
}

(function($){

	// dom content ready
	$(function() {

		// load templates
		loadConfigurations();

		// save configuration
		$("#time-form").on("submit", function(){
				saveConfiguration();
				return false;
		});

		$("#configurations").on("change", function() {
			loadAlarm();
		})
	});
})(jQuery);
