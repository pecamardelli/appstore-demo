const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

// Here is the role model
// id           ->  Quite self explanatory
// accessValue  ->  A number that determines the permissions of the role.
//                  Higher number means lower permissions. The site owner must be 1.
// displayName  ->  The name of the role: Site owner, Admin, client, developer, etc.

const Product	= sequelize.define('Product', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
	},
	displayName: {
        type:		Sequelize.STRING,
        unique:     true,
		validate:	{ notEmpty: true, max: 64 }
	}
});

// Let's sync to create the table if doesn't exists
Product.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing products table', error) });


module.exports = Product;
