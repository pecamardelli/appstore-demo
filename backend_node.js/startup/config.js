/*
 *	Check config parameters
*/
const config = require('config');
const logger = require('../lib/logger');

module.exports	= () => {
	if (!config.get('jwtPrivateKey')) {
		const errText	= 'FATAL ERROR: jwtPrivateKey not set. Quitting.';
		logger.log('error', errText)
		throw new Error(errText);
	}
}