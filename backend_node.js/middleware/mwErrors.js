const	logger	= require('../lib/logger');

module.exports	= function(err, req, res, next) {
	// Send a 500 error: Internal Server Error.
	logger.log('error', err.message);
	console.log(err);
	res.status(500).send('Internal Server Error (500).');
}