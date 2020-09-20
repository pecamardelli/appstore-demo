const error		= require('../middleware/mw_errors');
const auth		= require('../routes/auth');
const users		= require('../routes/users');
const express	= require('express');
const cors = require('cors');


module.exports	= function(app) {
	app.use(express.json());
	app.use(cors());
	// This is our public file folder
	app.use(express.static('public'));
	app.use('/api/users',	users);
	app.use('/api/auth',	auth);
	app.use(error);
}