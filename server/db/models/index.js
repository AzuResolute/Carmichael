const User = require('./user')
const Product = require('./product')
const Category = require('./category')


Product.belongsTo(Category, {foreignKey: 'CategoryID'});
Category.hasMany(Product);

module.exports = {
  User, Product, Category
}
