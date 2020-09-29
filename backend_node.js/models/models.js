const { Sequelize }	= require('sequelize');
const sequelize		= require('../startup/dbConfig');
const jwt			= require('jsonwebtoken');
const config		= require('config');
const bcrypt		= require('bcryptjs');

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
		beforeCreate: async function(user) {
            const salt		= await bcrypt.genSalt(10);
            const hashed	= await bcrypt.hash(user.password, salt);
            user.setDataValue('password', hashed);
            
		}
	}
});

User.prototype.generateAuthToken =  function(user) {
	const token	= jwt.sign({
        id:         user.id,
        username:   user.username,
        roleId:     user.roleId
    }, config.get('jwtPrivateKey'));

	return token;
}

User.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing users table', error) });

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

const Role	= sequelize.define('Role', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	accessValue: {
		type:			Sequelize.INTEGER.UNSIGNED,
		unique: 		true
	},
	displayName: {
        type:		Sequelize.STRING,
        unique:     true,
		validate:	{ notEmpty: true, max: 64 }
	}
});

// Let's sync to create the table if it doesn't exists
Role.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing roles table', error) });

const Section	= sequelize.define('Section', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	displayName: {
		type:		Sequelize.STRING,
		unique:		true,
		validate:	{ notEmpty: true, max: 255 }
	},
	description: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255
        }
	}
});

// Let's sync to create the table if doesn't exists
Section.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing sections table', error) });

const Category	= sequelize.define('Category', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
    },
    sectionId: {
        type:			Sequelize.UUID,
        validate:       {
            async function (value) {
                const sectionId = await Section.findOne({ where: { id: value }});
                if(!sectionId) throw new Error('Invalid section ID!');
            }
        }
    },
	displayName: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255,
            async function (value) {
                const existingCategory = await Category.findOne({ where: { displayName: value }});
                if(existingCategory && existingCategory.dataValues.sectionId == this.sectionId) {
                    throw new Error(`'${value}' category already exists for this section.`);
                }
            }
        }
	},
	endPoint: {
        type:		Sequelize.STRING
	},
	description: {
        type:		Sequelize.STRING,
		validate:	{
            notEmpty:   true,
            max:        255
        }
	}
}, {
    hooks: {
      afterValidate: async (category, options) => {
          // What is this for?? Well, we'll rely on the display name to generate
          // the dynamic route at the front-end and, obviously, "Health & Care" and such
          // would not be valid urls.
        const section       = await Section.findOne({
            where:      { id: category.sectionId },
            attributes: [ 'displayName' ]
        });
        const regexp        = new RegExp('[^a-z]', 'g');
        
        const sectionUrl    = section.dataValues.displayName.toLowerCase().replace(regexp, "");
        const categoryUrl   = category.displayName.toLowerCase().replace(regexp, "");
        const endpoint      = `/store/${sectionUrl}/${categoryUrl}`;
        category.setDataValue('endPoint', endpoint);
      }
    },
    sequelize
});

// Let's sync to create the table if doesn't exists
Category.sync()
	.then(() => { /* Do nothing for now */ })
	.catch((error) => { console.log('Error syncing categories table', error) });

/*
Category.create(
        { displayName:  'Books' }
    )
    .then(console.log('Rol creado...'))
    .catch(err => console.log(err.errors.map(e => e.message)));
*/

const Item	= sequelize.define('Item', {
	id: {
		type:			Sequelize.UUID,
		defaultValue:	Sequelize.UUIDV4,
		primaryKey:		true,
		allowNull:      false
	},
	displayName: {
		type:		Sequelize.STRING,
		validate:	{ notEmpty: true, max: 255 }
	},
	photo: {
		type:			Sequelize.STRING,
		validate:		{ isUrl: true },
		defaultValue:	'https://picsum.photos/1024'
	},
	categoryId: {
		type:			Sequelize.UUID,
		validate:       {
            async function (value) {
                const catId = await Category.findOne({ where: { id: value }});
                if(!catId) throw new Error('Invalid category ID!');
            }
        }
	},
	authorId: {
		type:			Sequelize.UUID,
		validate:   {
			async function (value) {
				const userId = await User.findOne({ where: { id: value }});
				if(!userId) throw new Error('Invalid author ID!');
			}
		}
	},
	endPoint: {
        type:		Sequelize.STRING
	},
	description: {
        type:		Sequelize.STRING(1024),
		validate:	{
            notEmpty:   true,
            max:        1024
        }
	},
	price: {
		type:		Sequelize.FLOAT,
		allowNull:	false,
		validate:	{ min: 0 }
	},
	downloads: {
		type:			Sequelize.INTEGER.UNSIGNED,
		allowNull:		false,
		defaultValue:	Math.round(Math.random()*1000),
		validate:		{ min: 0 }
	},
	rating: {
		type:			Sequelize.FLOAT,
		defaultValue:	Math.round(Math.random()*50)/10,
		validate:		{ min: 0, max: 5 }
	}
}, {
    hooks: {
      afterValidate: async (item, options) => {
        // What is this for?? Well, we'll rely on the display name to generate
        // the dynamic route at the front-end and, obviously, "Health & Care" and such
		// would not be valid urls.
		
		// Find the proper section and category
		const category		= await Category.findOne({ where: { id: item.categoryId }});
        const section       = await Section.findOne({ where: { id: category.sectionId }});
		// Define the regular expression used to convert the display name to a valid url
		const regexp        = new RegExp('[^a-z]', 'g');
		
        const sectionUrl    = section.dataValues.displayName.toLowerCase().replace(regexp, "");
        const categoryUrl   = category.dataValues.displayName.toLowerCase().replace(regexp, "");
        const itemUrl		= item.displayName.toLowerCase().replace(regexp, "");
		const itemEndPoint  = `/store/${sectionUrl}/${categoryUrl}/${itemUrl}`;
		
		// Set the value
        item.setDataValue('endPoint', itemEndPoint);
      }
    },
    sequelize
});

Item.sync()
	.then(() => { /* Do nothing for now */ })
    .catch((error) => { console.log('Error syncing items table', error) });

module.exports.User		= User;
module.exports.Role     = Role;
module.exports.Section  = Section;
module.exports.Category = Category;
module.exports.Item     = Item;

// Model relations
User.hasOne(Role);
Role.belongsTo(User, { foreignKey: 'roleId' });
Section.hasMany(Category);
Category.belongsTo(Section, { foreignKey: 'sectionId' });
Item.belongsTo(User, { foreignKey: 'authorId' });
Item.belongsTo(Category, { foreignKey: 'categoryId' });
