const User = require('./user')
const Product = require('./product')
const Category = require('./category')
const Order = require('./order')
const OrderDetails = require('./orderDetails')
const Customer = require('./customer')


Product.belongsTo(Category, {foreignKey: 'CategoryID'});
Category.hasMany(Product);
Order.belongsToMany(Product, {through: OrderDetails, foreignKey: 'OrderID'});
Product.belongsToMany(Order, {through: OrderDetails, foreignKey: 'ProductID'});
Order.belongsTo(Customer, {foreignKey: 'CustomerID'});
Customer.hasMany(Order);


module.exports = {
  User, Product, Category, Order, OrderDetails, Customer
}
