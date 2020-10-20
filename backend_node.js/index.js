/*
 *	App Store Demo
 *
*/
require('express-async-errors');
require('dotenv').config();				// Load sensitive values and store them in environment variables.

const	Joi		= require('joi');
Joi.objectId    = require('joi-objectid')(Joi);
const	logger	= require('./lib/logger');
const	express	= require('express');
const	app		= express();

require('./startup/routes')(app);
require('./startup/config')();
require('./startup/logging')();

const port  	= process.env.PORT || 3900;
const server    = app.listen(port, () => logger.log('info', `Listening on port ${port}...`));

if(process.env.NODE_ENV === 'test') module.exports  = server;
