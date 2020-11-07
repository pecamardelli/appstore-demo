const jwt		= require('jsonwebtoken');
const config	= require('config');
const logger	= require('../lib/logger');

function auth(req, res, next) {
	const token	= req.header('x-auth-token');
	if(!token) return res.status(401).send('Access denied. No token provided.');
	try {
		const decoded	= jwt.verify(token, config.get('jwtPrivateKey'));

		const jwtLife	= Math.round((Date.now()/1000) - decoded.iat);
		if(jwtLife >= parseInt(config.get('jwtLifeTime')))
			return res.status(409).send('Session timed out. Please login again.');
		
		req.user		= decoded;
		next();
	}
	catch (ex) {
		logger.log('error', ex);
		res.status(400).send('Invalid token.');
	}
}

module.exports	= auth;