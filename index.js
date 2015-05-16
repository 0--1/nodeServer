'use strict'

var CONFIG = require('./config/config.js'),
	app = require('./lib/app.js'),
	router = require('./lib/routes.js'),
	db = require('./lib/db.js'),
	authenticator = require('./lib/authenticator.js'),
	errorGenerator = require('./lib/error.js'),
	server;

// authentication middleware
app.all('/api/pronto/*', authenticator);

// processing all defined routes
app.use('/api/pronto/', router);

// if no route is matched, respond 404
app.use(function(req, res, next) {
	var error = errorGenerator(404, 'Requested API is not found');
	res.status(404).json(error).end();
});

server = app.listen(CONFIG.app.port, function() {
	console.log(server.address());
});