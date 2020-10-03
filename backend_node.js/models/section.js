const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const Section	= sequelize.define('Section', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	displayName: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ notEmpty: true, max: 255 }
	},
	description: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255
        }
	}
});

// Let's sync to create the table if doesn't exists
Section.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing sections table', error) });
    
module.exports  = Section;