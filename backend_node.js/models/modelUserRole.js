const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

// Here is the role model
// id           ->  Quite self explanatory
// accessValue  ->  A number that determines the permissions of the role.
//                  Higher number means lower permissions. The site owner must be 1.
// displayName  ->  The name of the role: Site owner, Admin, client, developer, etc.

const Role	= sequelize.define('Role', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
	},
	accessValue: {
		type:			Sequelize.INTEGER.UNSIGNED,
		unique: 		true
	},
	displayName: {
        type:		Sequelize.STRING,
        unique:     true,
		validate:	{ notEmpty: true, max: 64 }
	}
});

// Let's sync to create the table if doesn't exists
Role.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing roles table', error) });

module.exports = Role;

/*
const User = require('./models/model_user');
Role.create({
        displayName:  'Client',
        accessValue:   5
    })
    .then(console.log('Rol creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));
*/