const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const User		    = require('./user');
const Product	    = require('./product');

const statuses		= [ 'pending', 'onCart', 'canceled', 'completed' ];

const Sale	= sequelize.define('Sale', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	productId: {
		type:		Sequelize.UUID,
		validate:   {
            async function (value) {
                const product = await Product.findOne({ where: { id: value }});
                if(!product) throw new Error('Invalid product ID!');
            }
        }
	},
	userId: {
		type:		Sequelize.UUID,
		validate:   {
			async function (value) {
				const user = await User.findOne({ where: { id: value }});
				if(!user) throw new Error('Invalid user ID!');
			}
		}
	},
	salePrice: {
		type:		Sequelize.FLOAT,
		allowNull:	false,
		validate:	{ min: 0 }
    },
	quantity: {
		type:			Sequelize.INTEGER.UNSIGNED,
		allowNull:		false,
		defaultValue:	1,
		validate:		{ min: 0 }
    },
    status: {
        type:       	Sequelize.ENUM,
        values:     	statuses,
        defaultValue:	statuses[0]
    }
});

Sale.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing sales table', error) });

module.exports  = Sale;