const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const Category	    = require('./category');
const User		    = require('./user');

const Product	= sequelize.define('Product', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	displayName: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	photo: {
		type:			Sequelize.STRING,
		validate:		{ max: 255 },
		defaultValue:	''
	},
	categoryId: {
		type:			Sequelize.UUID,
		validate:       {
            async function (value) {
                const catId = await Category.findOne({ where: { id: value }});
                if(!catId) throw new Error('Invalid category ID!');
            }
        }
	},
	authorId: {
		type:			Sequelize.UUID,
		validate:   {
			async function (value) {
				const userId = await User.findOne({ where: { id: value }});
				if(!userId) throw new Error('Invalid author ID!');
			}
		}
	},
	path: {
        type:		Sequelize.STRING
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
		defaultValue:	Math.round(Math.random()*1000),
		validate:		{ min: 0 }
	},
	rating: {
		type:			Sequelize.FLOAT,
		defaultValue:	Math.round(Math.random()*50)/10,
		validate:		{ min: 0, max: 5 }
	}
}, {
    hooks: {
      afterValidate: async (item, options) => {
        // What is this for?? Well, we'll rely on the display name to generate
        // the dynamic route at the front-end and, obviously, "Health & Care" and such
		// would not be valid urls.
		
		const category		= await Category.findOne({ where: { id: item.categoryId }});
		const regexp        = new RegExp('[^a-z ]', 'g');
        const itemName		= item.displayName
                                .toLowerCase()
                                .replace(regexp, "")
                                .replace(" ", "-");
		const itemPath      = `${category.path}/${itemName}`;
		
		// Set the value
        item.setDataValue('path', itemPath);
      }
    },
    sequelize
});

Product.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing items table', error) });

module.exports  = Product;