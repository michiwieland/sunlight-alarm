'use strict';

var schedule = require('node-schedule');
var Configurator = require('./configurator');
var LightController = require('./lightcontroller');


var Clockdaemon = (function(){
	function Clockdaemon(configfile){
		this.configurator = new Configurator(configfile);
		this.alarms = [];
		this.reload();
	}

	Clockdaemon.prototype.cleanup = function(){
		this.deleteSchedulingTasks();
	};

	Clockdaemon.prototype.loadConfiguration = function(){
		this.config = this.configurator.readConfig();
	};

	Clockdaemon.prototype.deleteSchedulingTasks = function(){
		var alarm;
		while(alarm = this.alarms.pop()) {
			alarm.cancel();
		}
	};

	Clockdaemon.prototype.createSchedulingTasks = function(){
		for(var alarm of this.config.alarms){
			var alarmtime = this.configurator.getAlarmCronTime(alarm);
			this.alarms.push(schedule.scheduleJob(alarmtime, function(){
				var light = new LightController();
				light.enlighten(alarm.enlightDuration * 60);
				setTimeout(function(){
					light.dimToLowest();
					// ^ is required as the bulb goes to the last used mode on boot
					light.off();
				}.bind(this), alarm.lightDuration * 60 * 1000);
			}.bind(this)));
		}
	};

	Clockdaemon.prototype.reload = function(){
		this.loadConfiguration();
		this.deleteSchedulingTasks();
		this.createSchedulingTasks();
	};

	return Clockdaemon;
})();

module.exports = Clockdaemon;
