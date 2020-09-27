const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

// Here is the role model
// id           ->  Quite self explanatory
// displayName  ->  The name of the product: app, movie, book, music, comic and so on.
// description  ->  Some generic latin words.

const Section	= sequelize.define('Section', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
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


module.exports = Section;
