//const { Category, User }	= require('./models');
const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const Category		= require('./category');
const User			= require('./user');

const Product	= sequelize.define('Product', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	displayName: {
		type:		Sequelize.STRING,
		unique:		'uniqueFlag',
		validate:	{ notEmpty: true, max: 255 }
	},
	categoryId: {
		type:		Sequelize.UUID,
		unique:		'uniqueFlag',
		validate:       {
            async function (value) {
                const catId = await Category.findOne({ where: { id: value }});
                if(!catId) throw new Error('Invalid category ID!');
            }
        }
	},
	userId: {
		type:		Sequelize.UUID,
		validate:   {
			async function (value) {
				const userId = await User.findOne({ where: { id: value }});
				if(!userId) throw new Error('Invalid author ID!');
			}
		}
	},
	alias: {
        type:		Sequelize.STRING,
		unique:     true,
		validate:	{ max: 255 }
	},
	description: {
        type:		Sequelize.STRING(1024),
		validate:	{
            notEmpty:   true,
            max:        1024
        }
	},
	price: {
		type:		Sequelize.FLOAT,
		allowNull:	false,
		validate:	{ min: 0 }
	},
	downloads: {
		type:			Sequelize.INTEGER.UNSIGNED,
		allowNull:		false,
		defaultValue:	0,
		validate:		{ min: 0 }
	},
	rating: {
		type:			Sequelize.FLOAT,
		defaultValue:	0,
		validate:		{ min: 0, max: 5 }
	}
}, {
	hooks: {
		beforeBulkCreate: function(instances, options) {
            options.individualHooks = true;
            options.validate		= true;
        },
		afterValidate: (product) => {
		  // In here we'll generate the alias based on the displayName attribute.
		  // Let's eliminate all characters except lowercase letters and hyphens
		  const regexp    = new RegExp('[^a-z -]', 'g');
		  const alias     = product.displayName
								.toLowerCase()
								.replace(regexp, "")
								.replace(/ /g, "-")
								.replace(/-+/g, "-");
		  product.setDataValue('alias', alias);
		}
	},
	sequelize
}, {
    uniqueKeys: {
        uniqueFlag: {
            fields: ['displayName', 'categoryId' ]
        }
    }
});

Product.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing products table', error) });


module.exports  = Product;