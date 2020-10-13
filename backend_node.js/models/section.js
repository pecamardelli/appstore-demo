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
            max:        1024
        }
	},
	alias: {
        type:		Sequelize.STRING,
		unique:     true,
		validate:	{ max: 255 }
	},
}, {
    hooks: {
      afterValidate: (section, options) => {
        // In here we'll generate the alias based on the displayName attribute.
        // Let's eliminate all characters except lowercase letters and hyphens.
        const regexp    = new RegExp('[^a-z -]', 'g');
        const alias		= section.displayName
							.toLowerCase()
							.replace(regexp, "")
							.replace(/ /g, "-")
							.replace(/-+/g, "-");
        section.setDataValue('alias', alias);
      }
    },
    sequelize
});

// Let's sync to create the table if doesn't exists
Section.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing sections table', error) });
    
module.exports  = Section;