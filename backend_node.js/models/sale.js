const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const User		    = require('./user');

const statuses		= [ 'completed', 'challenged', 'canceled', 'payment_pending' ];

const Sale	= sequelize.define('Sale', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
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
    status: {
        type:       	Sequelize.ENUM,
        values:     	statuses,
        defaultValue:	statuses[0]
    }
});

Sale.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing wishes table', error) });

module.exports  = Sale;