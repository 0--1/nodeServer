'use strict';

var cluster = require('cluster'),
	CONFIG = require('./config/config.js'),
	numWorkers = CONFIG.app.numWorkers,
	app = require('./lib/app.js'),
	router = require('./lib/routes.js'),
	authenticator = require('./lib/authenticator.js'),
	errorGenerator = require('./lib/error.js'),
	envVariables = require('./lib/env.js'),
	logger = require('./lib/logger.js'),
	server;

if(cluster.isMaster) {
	// set up default environment variables and process arguments
	envVariables.setDefaultValues();

	var i, worker, workers = [];
	logger.write((new Date()).toISOString() + ': Master cluster setting up ' + numWorkers + ' workers...');

	for(i = 0; i < numWorkers; i++) {
		worker = cluster.fork();
		workers[worker.process.pid] = worker;
	}

	cluster.on('online', function(_worker) {
		logger.write((new Date()).toISOString() + ': Worker ' + _worker.process.pid + ' is online');
	});

	cluster.on('exit', function(_worker, code, signal) {
		logger.error((new Date()).toISOString() + ': Worker ' + _worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal);
		logger.write((new Date()).toISOString() + ': Starting a new worker');
		delete workers[_worker.process.pid];
		worker = cluster.fork();
		workers[worker.process.pid] = worker;
	});
} else if (cluster.isWorker) {
	// authentication middleware
	app.all('/api/pronto/*', authenticator);

	// processing all defined routes
	app.use('/api/pronto/', router);

	// if no route is matched, respond 404
	app.use(function(req, res) {
		var error = errorGenerator(404, 'Requested API is not found');
		res.status(404).json(error).end();
	});

	server = app.listen(CONFIG.app.port, CONFIG.app.ip, function() {
		logger.success((new Date()).toISOString() + ': Process ' + process.pid + ' is listening to ' + server.address().address + ':' + server.address().port);
	});
}