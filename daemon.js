'use strict';

var process = require('process');
var Clockdaemon = require('./app/clockdaemon');
var daemon_clock = new Clockdaemon('./config.json');

process.on('exit', (code) => {
	daemon_clock.cleanup();
});

process.on('SIGUSR2', () => {
	daemon_clock.reload();
});
