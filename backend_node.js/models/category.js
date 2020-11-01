const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const categoryStatuses	= [
	'enabled',
	'disabled',
	'deleted'
];

const Category	= sequelize.define('Category', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
    },
	displayName: {
        type:		Sequelize.STRING,
        unique:     'uniqueFlag',
        validate:	{ notEmpty: true, max: 255 }
	},
	alias: {
        type:		Sequelize.STRING,
        unique:     'uniqueFlag',
        validate:	{ max: 255 }
	},
	description: {
        type:		Sequelize.STRING(4096),
		validate:	{
            notEmpty:   true,
            max:        4096
        }
    },
    status: {
		type:		Sequelize.ENUM,
		values:		categoryStatuses,
		defaultValue:	categoryStatuses[0],
		validate:	{ isIn: categoryStatuses }
	},
}, {
    hooks: {
        beforeBulkCreate: function(instances, options) {
            options.individualHooks = true;
            options.validate		= true;
        },
        afterValidate: (category, options) => {
            // In here we'll generate the alias based on the displayName attribute.
            // Let's eliminate all characters except lowercase letters and hyphens.
            const regexp    = new RegExp('[^a-z -]', 'g');
            const alias     = category.displayName
                                .toLowerCase()
                                .replace(regexp, "")
                                .replace(/ /g, "-")
                                .replace(/-+/g, "-");
            category.setDataValue('alias', alias);
        }
    },
    sequelize
}, {
    uniqueKeys: {
        uniqueFlag: {
            fields: [ 'displayName', 'SectionId', 'alias' ]
        }
    }
});

module.exports  = Category;