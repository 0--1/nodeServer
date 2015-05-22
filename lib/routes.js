'use strict';

var express = require('express'),
	router = express.Router();

router.post('/login', function(req, res) {
	res.json({message: Date.now()}).end();
});

router.get('/user', function(req, res) {
	res.json({message: 'Behrooz'}).end();
});

module.exports = router;