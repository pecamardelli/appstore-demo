const Role		= require('./role');
const User		= require('./user');
const Section	= require('./section');
const Category	= require('./category');
const Product	= require('./product');
const Sale		= require('./sale');

// Model relations
User.hasOne(Role);
User.hasMany(Sale);
Role.belongsTo(User, { foreignKey: 'roleId' });
Section.hasMany(Category);
Category.belongsTo(Section, { foreignKey: 'sectionId' });
Category.hasMany(Product);
Product.belongsTo(User, { foreignKey: 'authorId' });
Product.belongsTo(Category, { foreignKey: 'categoryId' });
Product.hasMany(Sale);
Sale.belongsTo(Product, { foreignKey: 'productId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

module.exports.User		= User;
module.exports.Role     = Role;
module.exports.Section  = Section;
module.exports.Category = Category;
module.exports.Product  = Product;
module.exports.Sale     = Sale;
