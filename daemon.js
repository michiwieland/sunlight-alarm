'use strict';

var process = require('process');
var Clockdaemon = require('./app/clockdaemon');

// initialize the clock running daemon
var daemon_clock = new Clockdaemon('./config.json');

// initialize webserver
// TODO

process.on('exit', function(code) {
	daemon_clock.cleanup();
});

process.on('SIGUSR2', function() {
	daemon_clock.reload();
});
