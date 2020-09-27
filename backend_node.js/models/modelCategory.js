const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const Section       = require('./modelSection');

// id           ->  Quite self explanatory
// displayName  ->  The name of the role: Site owner, Admin, client, developer, etc.
// description  ->  Some generic latin words.

const Category	= sequelize.define('Category', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
    },
    sectionId: {
        type:			Sequelize.INTEGER,
        validate:       {
            async function (value) {
                const sectionId = await Section.findOne({ where: { id: value }});
                if(!sectionId) throw new Error('Invalid section ID!');
            }
        }
    },
	displayName: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255,
            async function (value) {
                const existingCategory = await Category.findOne({ where: { displayName: value }});
                if(existingCategory && existingCategory.dataValues.productId == this.productId) {
                    throw new Error(`'${value}' category already exists for this product.`);
                }
            }
        }
	},
	endPoint: {
        type:		Sequelize.STRING
	},
	description: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255
        }
	}
}, {
    hooks: {
      afterValidate: async (category, options) => {
          // What is this for?? Well, we'll rely on the display name to generate
          // the dynamic route at the front-end and, obviously, "Health & Care" and such
          // would not be valid urls.
        const section       = await Section.findOne({ where: { id: category.sectionId }});
        const endpoint      = `/store/${section.dataValues.displayName.toLowerCase().replace(/[^a-zA-Z]/g, "")}/${category.displayName.toLowerCase().replace(/[^a-zA-Z]/g, "")}`;
        category.endPoint   = endpoint;
      }
    },
    sequelize
});

// Let's sync to create the table if doesn't exists
Category.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing categories table', error) });

/*
Category.create(
        { displayName:  'Books' }
    )
    .then(console.log('Rol creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));
*/

module.exports = Category;
