const error			= require('../middleware/mwErrors');
const auth			= require('../routes/auth');
const users			= require('../routes/users');
const sections		= require('../routes/sections');
const categories	= require('../routes/categories');
const items			= require('../routes/items');
const store			= require('../routes/store');
const express		= require('express');
const cors 			= require('cors');


module.exports	= function(app) {
	app.use(express.json());
	app.use(cors());
	// This is our public file folder
	app.use('/api', express.static('assets'));
	app.use('/api/users',		users);
	app.use('/api/sections',	sections);
	app.use('/api/categories',	categories);
	app.use('/api/items',		items);
	app.use('/api/auth',		auth);
	app.use('/api/store',		store);
	app.use('/api/store',		store);
	app.use(error);
}