'use strict';

var os = require('os'),
	CONFIG = {
		app: {
			numWorkers: os.cpus().length,
			ip: '127.0.0.1',
			port: 8081
		},
		db: {
			connectionLimit: 16,
			host: 'localhost',
			port: 3306,
			user: 'root',
			password: 'root',
			database: 'emda'
		},
		authentication: {
			secretKey: 'abcdefghijklmnopqrstuvwxyz',
			clientKey: 'evilking'
		}
	};

module.exports = CONFIG;