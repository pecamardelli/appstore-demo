/*
 *	Check config parameters
*/
const config	= require('config');
const logger	= require('../lib/logger');
const sequelize	= require('./dbConfig');
const { Role, User, Section, Category, Product, Wish, Sale, Comment }  = require('../models/models');

const { setRoles }		= require('../utils/example_content/roles');
const { setUsers }		= require('../utils/example_content/users');
const { setSections }	= require('../utils/example_content/sections');
const { setCategories } = require('../utils/example_content/categories');
const { setProducts }	= require('../utils/example_content/products');
const { setComments }	= require('../utils/example_content/comments');

function throwError(errText) {
	logger.log('error', errText)
	throw new Error(errText);
}

module.exports	= async () => {
	if (!config.get('jwtPrivateKey')) {
		throwError('FATAL ERROR: jwtPrivateKey not set. Quitting.');
	}

	// Check database integrity and content
	try {
        // Check if we can access to database
        await sequelize.authenticate();
    }
    catch (err) {
        throwError('FATAL ERROR: Could not connect to database.');
	}
	
	// Sync in this specific order. Otherwise, we could get an error because of table relations.
	await Role.sync();
	await User.sync();
	await Section.sync();
	await Category.sync();
	await Product.sync();
	await Sale.sync();
	await Wish.sync();
	await Comment.sync();

	// If the table is empty, populate it with some example content.
	if(!await Role.findOne()) await setRoles();
	if(!await User.findOne()) await setUsers();
	if(!await Section.findOne()) await setSections();
	if(!await Category.findOne()) await setCategories();
	if(!await Product.findOne()) await setProducts();
	if(!await Comment.findOne()) await setComments();
}