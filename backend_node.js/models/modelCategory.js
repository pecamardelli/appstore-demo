const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const Product = require('./modelProduct');

// Here is the role model
// id           ->  Quite self explanatory
// accessValue  ->  A number that determines the permissions of the role.
//                  Higher number means lower permissions. The site owner must be 1.
// displayName  ->  The name of the role: Site owner, Admin, client, developer, etc.

const Category	= sequelize.define('Category', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
    },
    productId: {
        type:			Sequelize.INTEGER,
        validate:       {
            async function (value) {
                const prodId = await Product.findOne({ where: { id: value }});
                if(!prodId) throw new Error('Invalid product ID!');
            }
        }
    },
	displayName: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        64,
            async function (value) {
                const existingCategory = await Category.findOne({ where: { displayName: value }});
                if(existingCategory && existingCategory.productId === this.productId) {
                    throw new Error('There is a category with that name for that product!');
                }
            }
        }
	}
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
