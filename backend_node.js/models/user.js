const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const jwt			= require('jsonwebtoken');
const config		= require('config');
const bcrypt		= require('bcryptjs');
const Role			= require('./role');

const User	= sequelize.define('User', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	firstname: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	lastname: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	bio:	{
		type:		Sequelize.STRING,
		validate:	{ max: 4096 }
	},
	roleId: {
		type:			Sequelize.UUID,
		validate:	{
            async function (value) {
                const roleId = await Role.findOne({
                    where:      { id: value },
                    attributes: ['displayName']
                });
                if(!roleId) throw new Error('Invalid role ID!');
			}
		}
	},
	email: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ max: 255, notEmpty: true, isEmail: true }
	},
	username: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ max: 255, notEmpty: true }
	},
	password: {
		type:		Sequelize.STRING,
		validate:	{ min: 8, max: 255 }
	}
}, {
	hooks: {
		beforeCreate: hashPassword,
		beforeSave: hashPassword
	}
});

async function hashPassword(user) {
	if (user.password) {
		const salt		= await bcrypt.genSalt(10);
		const hashed	= await bcrypt.hash(user.password, salt);
		user.setDataValue('password', hashed);
	}
}

User.prototype.generateAuthToken =  function(user) {
	console.log(user)
	const token	= jwt.sign({
        id:        		user.id,
        username:   	user.username,
        firstname:   	user.firstname,
		lastname:   	user.lastname,
		email:			user.email,
		role:			user.Role.dataValues.displayName,
		accessLevel:	user.Role.dataValues.accessLevel
    }, config.get('jwtPrivateKey'));

	return token;
}

User.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing users table', error) });

module.exports	= User;