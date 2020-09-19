/*
 *	Check config parameters
*/

const	config		= require('config');

module.exports	= () => {
	if (!config.get('jwtPrivateKey')) {
		throw new Error('FATAL ERROR: jwtPrivateKey not set. Quitting.');
	}
}