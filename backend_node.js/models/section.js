const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const sectionStatuses	= [
	'enabled',
	'disabled',
	'deleted'
];

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
        type:		Sequelize.STRING(4096),
		validate:	{
            notEmpty:   true,
            max:        4096
        }
	},
	alias: {
        type:		Sequelize.STRING,
		unique:     true,
		validate:	{ max: 255 }
	},
	status: {
		type:		Sequelize.ENUM,
		values:		sectionStatuses,
		defaultValue:	sectionStatuses[0],
		validate:	{ isIn: sectionStatuses }
	},
}, {
    hooks: {
		beforeBulkCreate: function(instances, options) {
			options.individualHooks = true;
			options.validate		= true;
		},
		afterValidate: (section) => {
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
    
module.exports  = Section;