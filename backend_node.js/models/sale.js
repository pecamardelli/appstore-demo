const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const User		    = require('./user');
const Item		    = require('./item');

const statuses		= [ 'pending', 'onCart', 'canceled', 'completed' ];

const Sale	= sequelize.define('Sale', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	itemId: {
		type:			Sequelize.UUID,
		validate:       {
            async function (value) {
                const catId = await Item.findOne({ where: { id: value }});
                if(!catId) throw new Error('Invalid item ID!');
            }
        }
	},
	userId: {
		type:			Sequelize.UUID,
		validate:   {
			async function (value) {
				const userId = await User.findOne({ where: { id: value }});
				if(!userId) throw new Error('Invalid user ID!');
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