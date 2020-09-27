/*
 *	App Store Demo
 *
*/

require('dotenv').config();				// Load sensitive values and store them in environment variables.

const	Joi		= require('joi');
Joi.objectId    = require('joi-objectid')(Joi);
const	logger	= require('./lib/logger');
const	express	= require('express');
const	app		= express();

require('./startup/routes')(app);
require('./startup/config')();
//require('./startup/logging')();
//require('./startup/validation')();
//require('./startup/prod')(app);

const port  	= process.env.PORT || 3900;
//const port      = 3000 + Math.round(62535 * Math.random());
const server    = app.listen(port, () => logger.log('info', `Listening on port ${port}...`));

if(process.env.NODE_ENV === 'test') module.exports  = server;
