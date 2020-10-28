const	logger		= require('../lib/logger');

module.exports	= function() {
	process.on('uncaughtException', (ex) => {
		logger.error('Error', ex);
		console.log(ex);
		// Terminate the process... We don't want to keep running the application in an unclean state.
		process.exit(1);
	});
	
	process.on('unhandledRejection', (ex) => {
		logger.error('Error', ex);
		console.log(ex);
		// Terminate the process... We don't want to keep running the application in an unclean state.
		process.exit(1);
	});
}
