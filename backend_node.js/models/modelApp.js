const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const jwt			= require('jsonwebtoken');
const config		= require('config');

const roles	= [ 'Client', 'Developer' ];

const User	= sequelize.define('User', {
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
		validate:	{ max: 255, notEmpty: true, isEmail: true }
	},
	username: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ max: 255, notEmpty: true }
	},
	password: {
		type:		Sequelize.STRING,
		validate:	{ max: 255 }
	}
});

const generateAuthToken =  (id, username, role) => {
	const token	= jwt.sign({ id, username, role }, config.get('jwtPrivateKey'));
	return token;
}

sequelize.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing users table', error) });


module.exports.User					= User;
module.exports.generateAuthToken	= generateAuthToken;
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