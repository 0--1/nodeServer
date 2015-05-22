'use strict';

var CONFIG = require('../config/config.js'),
	jwt = require('jwt-simple'),
	errorGenerator = require('./error.js'),
	error401 = errorGenerator(401, 'You require authentication to access this API!'),
	error403 = errorGenerator(403, 'You are not authorized to access this API'),
	authExemptRoutes = require('../config/auth_exempt_routes.js'),
	isRouteExempt = function(request) {
		var routeFound = authExemptRoutes.some(function(authExemptRoute) {
			return request.method === authExemptRoute.method && request.originalUrl === authExemptRoute.url;
		});

		return routeFound;
	};

module.exports = function(req, res, next) {
	var encodedToken = req.headers['x-access-token'],
		encodedKey = req.headers['x-key'],
		token, key;

	// routes that do not require authentication
	if(isRouteExempt(req)) {
		next();
		return;
	}

	// routes that require authentication
	else if (encodedToken && encodedKey) {
		try {
			token = jwt.decode(encodedToken, CONFIG.authentication.secretKey);
			key = jwt.decode(encodedKey, CONFIG.authentication.secretKey);

			if(token.name && key.key === CONFIG.authentication.clientKey && key.expire > Date.now() - 100000000) {
				next();
				return;
			}
			throw new Error();
		} catch(e) {
			res.status(403).json(error403).end();
		}
	} else {
		res.status(401).json(error401).end();
	}

	return;
};