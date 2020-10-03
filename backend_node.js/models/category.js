const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const Section	    = require('./section');

const Category	= sequelize.define('Category', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
    },
    sectionId: {
        type:			Sequelize.UUID,
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
                if(existingCategory && existingCategory.dataValues.sectionId == this.sectionId) {
                    throw new Error(`'${value}' category already exists for this section.`);
                }
            }
        }
	},
	path: {
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
        const section       = await Section.findOne({
            where:      { id: category.sectionId },
            attributes: [ 'displayName' ]
        });
        const regexp        = new RegExp('[^a-z]', 'g');
        
        const sectionUrl    = section.dataValues.displayName.toLowerCase().replace(regexp, "");
        const categoryUrl   = category.displayName.toLowerCase().replace(regexp, "");
        const endpoint      = `/store/${sectionUrl}/${categoryUrl}`;
        category.setDataValue('endPoint', endpoint);
      }
    },
    sequelize
});

// Let's sync to create the table if doesn't exists
Category.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing categories table', error) });

module.exports  = Category;

    /*
Category.create(
        { displayName:  'Books' }
    )
    .then(console.log('Rol creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));
*/