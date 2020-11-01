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
		validate:	{ notEmpty: true, max: 255 }
	}
});
    
module.exports  = Role;