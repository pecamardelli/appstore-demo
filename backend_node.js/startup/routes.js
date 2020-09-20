const error		= require('../middleware/mw_errors');
const auth		= require('../routes/auth');
const express	= require('express');

module.exports	= function(app) {
	app.use(express.json());
	// This is our public file folder
	app.use(express.static('public'));
	app.use('/api/auth',	auth);
	app.use(error);
}