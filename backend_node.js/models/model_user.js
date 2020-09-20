const	config		= require('config');
const	jwt			= require('jsonwebtoken');
const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/db-config');

const roles	= [ 'client', 'developer' ];

module.exports	= sequelize.define('user', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
	},
	firstname: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	lastname: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	role: {
		type:		Sequelize.ENUM,
		values:		roles,
		validate:	{ isIn: [ roles ] }
	},
	email: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ isEmail: true }
	},
	username: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ max: 255 }
	},
	password: {
		type:		Sequelize.STRING,
		validate:	{ max: 255 }
	}
});

sequelize.sync()
	.then(function() {})
	.catch(function(error) {});