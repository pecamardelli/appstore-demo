const error			= require('../middleware/mwErrors');
const auth			= require('../routes/auth');
const users			= require('../routes/users');
const sections		= require('../routes/sections');
const categories	= require('../routes/categories');
const products		= require('../routes/products');
const store			= require('../routes/store');
const wishes		= require('../routes/wishes');
const search		= require('../routes/search');
const me			= require('../routes/me');
const express		= require('express');
const cors 			= require('cors');

module.exports	= function(app) {
	app.use(express.json({limit: '50mb'}));
	app.use(cors());
	// This is our public file folder
	app.use('/api', express.static('assets'));
	app.use('/api/users',		users);
	app.use('/api/sections',	sections);
	app.use('/api/categories',	categories);
	app.use('/api/products',	products);
	app.use('/api/auth',		auth);
	app.use('/api/store',		store);
	app.use('/api/wishes',		wishes);
	app.use('/api/search',		search);
	app.use('/api/me',			me);
	app.use(error);
}