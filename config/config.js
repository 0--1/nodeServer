'use strict'

var CONFIG = {
	app: {
		port: 8081
	},
	db: {
		connectionLimit: 32,
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