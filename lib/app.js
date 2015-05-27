'use strict';

var express = require('express'),
	app = express(),
	fs = require('fs'),
	morgan = require('morgan'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	logFileStream = fs.createWriteStream('./access.log', {flags: 'a'});

// disable caching
app.set('etag', false);

// log details of requests and responses on screen and in file
app.use(morgan('dev'));
app.use(morgan('Process ' + process.pid + ': :date[iso] :method :url :status :response-time :remote-addr :remote-user :user-agent :referrer', {stream: logFileStream}));

// compress responses (gzip)
app.use(compression());

// parse requset body as json
app.use(bodyParser.json());

// perform header operations on all incoming calls
app.all('/*', function(req, res, next) {
	// enable Enable Cross Origin Resource Sharing
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
	
	// allow only the following custom headers
	res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');

	// bypass OPTIONS call
	if (req.method === 'OPTIONS') {
		res.sendStatus(200).end();
	} else {
		next();
	}
});

module.exports = app;