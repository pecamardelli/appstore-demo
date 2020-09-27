const { Sequelize }	= require('sequelize');
const { User }		= require('./modelUser');
const Category		= require('./modelCategory');
const Section		= require('./modelSection');
const sequelize		= require('../startup/dbConfig');

const Item	= sequelize.define('User', {
	id: {
		type:			Sequelize.INTEGER,
		primaryKey:		true,
		autoIncrement:	true
	},
	displayName: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	photo: {
		type:			Sequelize.STRING,
		validate:		{ isUrl: true },
		defaultValue:	'https://picsum.photos.com/200'
	},
	sectionId: {
		type:		Sequelize.INTEGER,
		validate:       {
            async function (value) {
                const prodId = await Section.findOne({ where: { id: value }});
                if(!prodId) throw new Error('Invalid section ID!');
            }
        }
	},
	categoryId: {
		type:		Sequelize.INTEGER,
		validate:       {
            async function (value) {
                const catId = await Category.findOne({ where: { id: value }});
                if(!catId) throw new Error('Invalid category ID!');
            }
        }
	},
	authorId: {
		type:		Sequelize.INTEGER,
		validate:   {
			async function (value) {
				const userId = await User.findOne({ where: { id: value }});
				if(!userId) throw new Error('Invalid author ID!');
			}
		}
	},
	description: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255
        }
	},
	price: {
		type:		Sequelize.FLOAT,
		allowNull:	false,
		validate:	{ min: 0 }
	},
	downloads: {
		type:		Sequelize.INTEGER.UNSIGNED,
		allowNull:	false,
		validate:	{ min: 0 }
	},
	rating: {
		type:			Sequelize.FLOAT,
		defaultValue:	Math.random()*5,
		validate:		{ min: 0, max: 5 }
	}
});

sequelize.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing users table', error) });


module.exports	= Item;

/*
const User = require('./models/model_user');
User.create({
        firstname:  'Pablin',
        lastname:   'Camardelli',
        email:      'pecamardelli@gmail.com',
        role:       'developer',
        username:   'elmaspablin',
        password:   'Pablin324'
    })
    .then(console.log('Usuario creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));


User.findOne({ where: { username: 'elmaspablin' }})
.then(user => console.log(user.username))
*/