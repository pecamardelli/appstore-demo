/*
 *	App Store - Node.js backend
 *
*/

require('dotenv').config();				// Load sensitive values and store them in environment variables.
const { sequelize } = require('./startup/db-config');

console.log(sequelize);

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

/*
const startupDebugger	= require('debug')('app:startup');
const morgan	= require('morgan');	// Using morgan to format log messages.
const Joi		= require('joi');
Joi.objectId    = require('joi-objectid')(Joi);
const logger	= require('./lib/logger');
const express	= require('express');	// Using express framework for the app.

const app		= express();					// Store the express object in this variable.

// Setting up all routes
require('./startup/routes')(app);
require('./startup/db-config')();
require('./startup/logging')();
require('./startup/config')();

// Check if PORT environment variable is defined. Otherwise, use port 3000.
const	port	= process.env.PORT || 3000;
app.listen(port, () => logger.log('info', `Listening on port ${port}...`));
*/