const Role		= require('./role');
const User		= require('./user');
const Section	= require('./section');
const Category	= require('./category');
const Item		= require('./item');
const Sale		= require('./sale');

// Model relations
User.hasOne(Role);
User.hasMany(Sale);
Role.belongsTo(User, { foreignKey: 'roleId' });
Section.hasMany(Category);
Category.belongsTo(Section, { foreignKey: 'sectionId' });
Category.hasMany(Item);
Item.belongsTo(User, { foreignKey: 'authorId' });
Item.belongsTo(Category, { foreignKey: 'categoryId' });
Item.hasMany(Sale);
Sale.belongsTo(Item, { foreignKey: 'itemId' });
Sale.belongsTo(User, { foreignKey: 'userId' });

module.exports.User		= User;
module.exports.Role     = Role;
module.exports.Section  = Section;
module.exports.Category = Category;
module.exports.Item     = Item;
module.exports.Sale     = Sale;
