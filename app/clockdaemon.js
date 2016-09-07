'use strict';

var schedule = require('node-schedule');
var Configurator = require('./configurator');
var LightController = require('./lightcontroller');


var Clockdaemon = (function(){
	function Clockdaemon(configfile){
		this.configurator = new Configurator(configfile);
		this.reload();
		this.alarms = [];
	}

	Clockdaemon.prototype.cleanup = function(){
		this.deleteSchedulingTasks();
	};

	Clockdaemon.prototype.loadConfiguration = function(){
		this.config = this.configurator.readConfig();
	};

	Clockdaemon.prototype.deleteSchedulingTasks = function(){
		// TODO: unschedule
	};

	Clockdaemon.prototype.createSchedulingTasks = function(){
		for(var alarm of config.alarms){
			this.alarms.push(schedule.scheduleJob(alarm.time, function(){
				var light = new LightController();
				light.enlighten();
				setTimeout(alarm.light.timeout, function(){
					light.off();
				};
			});
		}
	};

	Clockdaemon.prototype.reload = function(){
		this.loadConfiguration();
		this.deleteSchedulingTasks();
		this.createSchedulingTasks();
	};

	return Clockdaemon;
})();

exports = module.exports = Clockdaemon;
