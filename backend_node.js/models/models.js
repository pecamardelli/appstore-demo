const { Sequelize }	= require('sequelize');
const Role		    = require('./role');
const User		    = require('./user');
const Section	    = require('./section');
const Category	    = require('./category');
const Product	    = require('./product');
const Sale		    = require('./sale');

// Model relations
User.hasOne(Role);
User.hasMany(Sale);
User.belongsTo(Role, { foreignKey: 'roleId' });
Section.hasMany(Category);
Category.belongsTo(Section, { foreignKey: 'sectionId' });
Category.hasMany(Product);
Product.belongsTo(User, { foreignKey: 'authorId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(Sale);
Sale.belongsTo(Product, { foreignKey: 'productId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

// Model custom functions
Section.prototype.findByAlias	=  function(alias) {
	return Section.findOne({
		where:      { alias },
		attributes: [ 'id', 'displayName', 'description', 'alias' ]
	});
};

Category.prototype.findByAliasAndSectionId	=  function(alias, sectionId) {
	return Category.findOne({
		where:      { alias, sectionId },
		attributes: [ 'id', 'displayName', 'description', 'alias' ]
	});
};

Category.prototype.findBySectionId = function (sectionId) {
    return Category.findAll({
        where:      { sectionId },
        attributes: [
            ['displayName', 'displayName'],
            ['id', 'id'],
            ['alias', 'alias'],
            ['description', 'description'],
            [Sequelize.fn("COUNT", Sequelize.col("products.id")), "total"]
        ],
        include: [
            { 
                model:      Product,
                attributes: []
            },
            {
                model:      Section,
                attributes: [ 'alias' ]
            }
        ],
        group: ['Category.id'] 
    });
};

Product.prototype.findByCategoryId =  function(categoryId) {
	return Product.findAll({
		where: { categoryId },
		include: [
			{
				model: User,
				attributes: [ 'username' ]
			},
			{
				model: Category,
				attributes: [ 'id', 'displayName', 'alias' ],
				include:    [
					{
						model:  Section,
						attributes: [ 'id', 'displayName', 'alias' ]
					}
				]
			}
		],
		attributes: [ 'id', 'displayName', 'description', 'price', 'rating', 'downloads', 'alias' ]
	});
};

module.exports.User		= User;
module.exports.Role     = Role;
module.exports.Section  = Section;
module.exports.Category = Category;
module.exports.Product  = Product;
module.exports.Sale     = Sale;
