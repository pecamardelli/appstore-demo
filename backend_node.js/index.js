/*
 *	App Store Demo
 *
*/

require('dotenv').config();				// Load sensitive values and store them in environment variables.
const User = require('./models/model_user');
/*
User.create({
        firstname:  'Pablin',
        lastname:   'Camardelli',
        email:      'pecamardelli@gmail.com',
        role:       'developer',
        username:   'elmaspablin',
        password:   'Pablin324'
    })
    .then(console.log('Usuario creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));
*/

User.findOne({ where: { username: 'elmaspablin' }})
    .then(user => console.log(user.username))
/*
const	Joi		= require('joi');
Joi.objectId    = require('joi-objectid')(Joi);
const	logger	= require('./lib/logger');
const	express	= require('express');
const	app		= express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/logging')();
require('./startup/validation')();
require('./startup/prod')(app);

//const port  	= process.env.PORT || 3001;
const port      = 3000 + Math.round(62535 * Math.random());
const server    = app.listen(port, () => logger.log('info', `Listening on port ${port}...`));

if(process.env.NODE_ENV === 'test') module.exports  = server;
*/