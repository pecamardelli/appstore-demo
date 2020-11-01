const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const statuses		= [ 'pending', 'onCart', 'canceled', 'completed' ];

const Wish	= sequelize.define('Wish', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
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

module.exports  = Wish;