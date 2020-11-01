const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const statuses		= [ 'completed', 'challenged', 'canceled', 'payment_pending', 'in_process' ];

const Sale	= sequelize.define('Sale', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	total: {
		type:		Sequelize.FLOAT,
		allowNull:	false,
		validate:	{ min: 0 }
	},
    status: {
        type:       	Sequelize.ENUM,
        values:     	statuses,
        defaultValue:	statuses[4]
    }
});

module.exports  = Sale;