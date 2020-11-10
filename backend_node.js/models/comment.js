const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');

const Comment	= sequelize.define('Comment', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	text: {
		type:		Sequelize.STRING(2048),
		validate:	{ notEmpty: true, max: 2048 }
    }
}, {
    uniqueKeys: {
        uniqueFlag: {
            fields: [ 'UserId', 'ProductId' ]
        }
    }
});

module.exports  = Comment;