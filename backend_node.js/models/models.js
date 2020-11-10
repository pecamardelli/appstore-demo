const { Sequelize }	= require('sequelize');
const Role		    = require('./role');
const User		    = require('./user');
const Section	    = require('./section');
const Category	    = require('./category');
const Product	    = require('./product');
const Wish		    = require('./wish');
const Sale			= require('./sale');
const Comment		= require('./comment');

// Model relations
//User.hasOne(Role);
User.hasMany(Wish);
User.hasMany(Sale);
User.hasMany(Product);
User.hasMany(Comment);
User.belongsTo(Role, { foreignKey: 'RoleId' });
Role.hasMany(User);
Section.hasMany(Category);
Category.belongsTo(Section, {
	foreignKey: {
		name: 'SectionId',
		unique: 'uniqueFlag'
	}
});
Category.hasMany(Product);
Product.belongsTo(User, { foreignKey: 'UserId' });
Product.belongsTo(Category, { foreignKey: 'CategoryId' });
Product.hasMany(Wish);
Product.hasMany(Comment);
Wish.belongsTo(Product, { foreignKey: 'ProductId' });
Wish.belongsTo(User, { foreignKey: 'UserId' });
Wish.belongsTo(Sale, { foreignKey: 'SaleId' });
Sale.belongsTo(User, { foreignKey: 'UserId' });
Sale.hasMany(Wish);
Comment.belongsTo(User, {
	foreignKey: {
		name: 'UserId',
		unique: 'uniqueFlag'
	}
});
Comment.belongsTo(Product, {
	foreignKey: {
		name: 'ProductId',
		unique: 'uniqueFlag'
	}
});

// Model custom functions
Section.prototype.findByAlias	=  function(alias) {
	return Section.findOne({
		where:      { alias },
		attributes: [ 'id', 'displayName', 'description', 'alias' ]
	});
};

Category.prototype.findOneByPath	=  async function(sectionAlias, categoryAlias) {
	return Category.findOne({
		where:      {
			alias: categoryAlias,
			$and: Sequelize.literal(`Section.alias = '${sectionAlias}'`)
		},
		attributes: [ 'id', 'displayName', 'description', 'alias' ],
		include:	[
			{ model:	Section }
		]
	});
};

Category.prototype.findBySectionAlias = async function (sectionAlias) {
	// This is what the sequelize Manual on its website says about using subqueries:
	//
	// 		Important Note: Since sequelize.literal inserts arbitrary content without escaping
	// 		to the query, it deserves very special attention since it may be a source of (major)
	// 		security vulnerabilities. It should not be used on user-generated content.
	//
	// Since the path received from the front-end can be user generated, I prefer to call
	// the Section.prototype.findByAlias function declared above.

	let section;
	try {
		section	= await Section.prototype.findByAlias(sectionAlias);
	}
	catch (ex) {
		return Promise.reject(`Internal Server Error: ${ex}`);
	}

	if(!section) return Promise.reject('No data found');

    return Category.findAll({
        where:      { SectionId: section.dataValues.id },
        attributes: [
            ['displayName', 'displayName'],
            ['id', 'id'],
            ['alias', 'alias'],
            ['description', 'description'],
            [Sequelize.fn("COUNT", Sequelize.col("Products.id")), "total"]
        ],
        include: [
            { 
                model:      Product
            },
            {
                model:      Section,
                attributes: [ 'id', 'alias' ]
            }
		],
		order: [['displayName', 'ASC']],
        group: ['Category.id'] 
    });
};

// Extracting some repetitive declarations...
const productIncludes	= [
	{
		model: User,
		attributes: [ 'id', 'firstname', 'lastname', 'email', 'username' ]
	},
	{
		model: Category,
		attributes: [ 'id', 'displayName', 'alias' ],
		include:    [{
			model:  Section,
			attributes: [ 'id', 'displayName', 'alias' ]
		}]
	},
	{
		model:  Comment,
		attributes: ['id', 'text', 'createdAt', 'rating'],
		include: [{
			model:  User,
			attributes: ['id', 'username']
		}]
	}
];

const productAttributes	= [
	'id',
	'displayName',
	'description',
	'price',
	'rating',
	'downloads',
	'alias',
	'createdAt',
	'updatedAt'
];

Product.prototype.findAllByPath = async function(sectionAlias, categoryAlias) {
	let category;
	try {
		category	= await Category.prototype.findOneByPath(sectionAlias, categoryAlias);
		if (!category) return Promise.reject(`Category with alias ${categoryAlias} not found.`);
	}
	catch (ex) {
		return Promise.reject(`Internal Server Error: ${ex}`);
	}

	return Product.findAll({
		where: { CategoryId: category.dataValues.id },
		include: productIncludes,
		attributes: productAttributes
	});
};

Product.prototype.findOneByPath =  function(sectionAlias, categoryAlias, productAlias) {
	return Product.findOne({
		where: { 
			alias: productAlias,
			$and: Sequelize.literal(`Section.alias = '${sectionAlias}'`),
			$and: Sequelize.literal(`Category.alias = '${categoryAlias}'`)
		},
		include: productIncludes,
		attributes: productAttributes,
		order: [
			[ { model: Comment }, 'createdAt', 'DESC']
		]
	});
};

module.exports.User		= User;
module.exports.Role     = Role;
module.exports.Section  = Section;
module.exports.Category = Category;
module.exports.Product  = Product;
module.exports.Wish     = Wish;
module.exports.Sale		= Sale;
module.exports.Comment	= Comment;
