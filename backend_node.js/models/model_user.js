const	config		= require('config');
const	jwt			= require('jsonwebtoken');
const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/db-config');

const roles	= [ 'Client', 'Developer' ];

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
	.catch(function(error) {console.log('Error syncing db', error)});

/*
const User = require('./models/model_user');
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


User.findOne({ where: { username: 'elmaspablin' }})
.then(user => console.log(user.username))
*/