/*
 *	All sensitive data must be defined at the .env file
 *	(which is gitignored and must be created at the root directory of the app).
 *
 *	See README.md for more info.
 *
*/

const dbDebugger	= require('debug')('app:db');	// Definnig the database debug namespace.
//const mysql			= require('mysql');				// Using MySQL as the relational database.
const { Sequelize }	= require('sequelize');

if (!process.env.APP_STORE_DB_HOST ||
	!process.env.APP_STORE_DB_PASSWORD ||
	!process.env.APP_STORE_DB_USER ||
	!process.env.APP_STORE_DB_PORT ||
	!process.env.APP_STORE_DB_NAME)
	{
	throw new Error('Not connecting to MySQL: Environment variables not set.');
}

module.exports = new Sequelize(
	process.env.APP_STORE_DB_NAME,
	process.env.APP_STORE_DB_USER,
	process.env.APP_STORE_DB_PASSWORD,
	{
		host:		process.env.APP_STORE_DB_HOST,
		port:		process.env.APP_STORE_DB_PORT,
		dialect:	'mysql'
	}
);

/*
else {
	const connection = mysql.createConnection({
		host:		process.env.DB_HOST,
	    port:		process.env.DB_PORT,
	    db:			process.env.DB_NAME,
		user:		process.env.DB_USER,
		password:	process.env.DB_PASSWORD
   });   
}


if(sequelize) {
    async function db() {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }

    db();
}
*/

