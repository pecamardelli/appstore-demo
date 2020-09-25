const error			= require('../middleware/mwErrors');
const auth			= require('../routes/auth');
const users			= require('../routes/users');
const products		= require('../routes/products');
const categories	= require('../routes/categories');
const root			= require('../routes/root');
const express		= require('express');
const cors 			= require('cors');


module.exports	= function(app) {
	app.use(express.json());
	app.use(cors());
	// This is our public file folder
	app.use(express.static('public'));
	app.use('/api/users',		users);
	app.use('/api/products',	products);
	app.use('/api/categories',	categories);
	app.use('/api/auth',		auth);
	app.use('/api/',			root);
	app.use(error);
}