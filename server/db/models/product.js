const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  ProductID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  ProductName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  QuantityPerUnit: {
    type: Sequelize.STRING
  },
  UnitPrice: {
    type: Sequelize.INTEGER
  },
  UnitsInStock: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  Discontinued: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

Product.loadSeed = async function(obj) {
  let {
    ProductID,
    ProductName,
    CategoryID,
    QuantityPerUnit,
    UnitPrice,
    UnitsInStock,
    Discontinued
  } = obj
  await Product.create({
    ProductID,
    ProductName,
    CategoryID,
    QuantityPerUnit,
    UnitPrice: Math.round(UnitPrice * 100),
    UnitsInStock,
    Discontinued
  })
}

module.exports = Product

