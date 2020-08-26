/*
 *	Alkemy Challenge - Backend
 *
 *	Main module of the appstore
 *
*/
require('dotenv').config();				// Load sensitive values and store them in environment variables.

const startupDebugger	= require('debug')('app:startup');

const config	= require('config');	// Using this module to store and parse generic config values.
const morgan	= require('morgan');	// Using morgan to format log messages.
const helmet	= require('helmet');	// Adding security for the express framework.
const Joi		= require('joi');		// Using Joi to validate user data with schemas.
const express	= require('express');	// Using express framework for the app.

global.db		= require('./db/db-config');	// Database connection.
const home		= require('./routes/home');		// Requiring routes.
const app		= express();					// Store the express object in this variable.

// Needed to parse incoming JSON type requests
app.use(express.json());

// This is our public file folder
app.use(express.static('public'));

// A little of security
app.use(helmet());

// The default route
app.use('/', home);

// Enable Morgan only in development environment
if (app.get('env') === 'development') {
	app.use(morgan('tiny'));
	startupDebugger('Morgan enabled...');
}

// Check if PORT environment variable is defined. Otherwise, we'll use port 3000.
const	port	= process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening no port ${port}...`));