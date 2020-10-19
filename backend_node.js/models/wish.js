const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const User		    = require('./user');
const Product	    = require('./product');

const statuses		= [ 'pending', 'onCart', 'canceled', 'completed' ];

const Wish	= sequelize.define('Wish', {
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
	},
	saleId: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		allowNull:		true,
		defaultValue:	null,
		validate:		{ isUUID: 4 }
	},
});

Wish.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing wishes table', error) });

module.exports  = Wish;