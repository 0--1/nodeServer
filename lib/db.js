'use strict';

var CONFIG = require('../config/config.js'),
	mysql = require('mysql'),
	pool = mysql.createPool({
		connectionLimit: CONFIG.db.connectionLimit,
		host: CONFIG.db.host,
		port: CONFIG.db.port,
		user: CONFIG.db.user,
		password: CONFIG.db.password,
		database: CONFIG.db.database
	});

module.exports = pool;

// pool.getConnection(function(dbError, connection) {
// 		if(dbError) throw dbError;

// 		connection.query('SELECT * FROM user_type', function(queryError, rows, fields) {
// 			if(queryError) throw dbError;
// 			console.log('MySQL connection id ' + connection.threadId);
// 			res.json(rows);
// 			connection.release();
// 		});
// });