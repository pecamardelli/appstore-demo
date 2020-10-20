/*
 *	All sensitive data must be defined at the .env file
 *	(which is gitignored and must be created at the root directory of the app).
 *
 *	See README.md for more info.
 *
*/

const dbDebugger	= require('debug')('app:db');	// Definnig the database debug namespace.
const { Sequelize }	= require('sequelize');
const config		= require('config');

if (!config.get('db_host') ||
	!config.get('db_password') ||
	!config.get('db_user') ||
	!config.get('db_port') ||
	!config.get('db_name'))
	{
	throw new Error('Not connecting to MySQL: Environment variables not set.');
}

module.exports = new Sequelize(
	config.get('db_name'),
	config.get('db_user'),
	config.get('db_password'),
	{
		host:		config.get('db_host'),
		port:		config.get('db_port'),
		dialect:	'mysql'
	}
);
