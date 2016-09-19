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
	alarm.enlightDuration = parseInt($("#enlight-duration").val());
	alarm.lightDuration = parseInt($("#light-duration").val());

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
		url: "/saveConfiguration",
		type:"POST",
		data:postData,
		contentType:"application/json; charset=utf-8",
		dataType:"json"
	}).done(function() {
		$("button").first().addClass("success");
		setTimeout(function () {
			$("button").first().removeClass("success");
		}, 1500);
	});
}

function loadConfigurations() {

	// load available configurations from server
	$.getJSON("/loadConfigurations", function(serverConfiguration){

		// load template and compile
		$.get('templates/configurations.handlebars', function (templateSource) {
	    var template = Handlebars.compile(templateSource);
			currentConfiguration = serverConfiguration;
			var view = template({alarms: currentConfiguration.alarms});
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
	var selectedAlarm;
	for (var alarm of currentConfiguration.alarms) {
		if ( alarm.name === $("#configurations").val() ) {
			alarm.selected = true;
			selectedAlarm = alarm;
		} else {
			alarm.selected = false;
		}
	}
	return selectedAlarm;
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
