/*
 *	All sensitive data must be defined at the .env file (which is gitignored and must be created at the root directory of the app).
 *
 *	See README.md for more info.
 *
*/

const dbDebugger	= require('debug')('app:db');	// Definnig the database debug namespace.
const mysql			= require('mysql');				// Using MySQL as the relational database.

if (!process.env.DB_HOST || !process.env.DB_PASSWORD || !process.env.DB_USER || !process.env.DB_PORT) {
	module.exports.db	= undefined;
	dbDebugger('Not connecting to database: env variables undefined.');
	return;
}

const connection = mysql.createConnection({
 	host:		process.env.DB_HOST,
	port:		process.env.DB_PORT,
 	user:		process.env.DB_USER,
 	password:	process.env.DB_PASSWORD
});

module.exports.db	= connection;

