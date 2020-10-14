const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const Role	= sequelize.define('Role', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	accessLevel: {
		type:			Sequelize.INTEGER.UNSIGNED,
		unique: 		true
	},
	displayName: {
        type:		Sequelize.STRING,
        unique:     true,
		validate:	{ notEmpty: true, max: 64 }
	}
});

// Let's sync to create the table if it doesn't exists
Role.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing roles table', error) });
    
module.exports  = Role;