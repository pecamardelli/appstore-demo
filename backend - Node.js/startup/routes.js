const error		= require('../middleware/middle_errors');
const express	= require('express');
const auth		= require('../routes/auth');

module.exports	= function(app) {
	app.use(express.json());
	// This is our public file folder
	app.use(express.static('public'));
	app.use('/api/auth', auth);
	app.use(error);
}