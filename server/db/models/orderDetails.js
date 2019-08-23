const Sequelize = require('sequelize')
const db = require('../db')

const OrderDetails = db.define('orderdetail', {
  OrderID: {
    type: Sequelize.INTEGER,
    // by cents
  },
  ProductID: {
    type: Sequelize.INTEGER,
    // by cents
  },
  UnitPrice: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // by cents
  },
  Quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  GrossProfitMargin: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // divide by 1,000
  },
  ProductCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // by cents
  },
  ProductRevenue: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
})

OrderDetails.loadSeed = async function(obj) {
  try {
    let {
      OrderID,
      ProductID,
      UnitPrice,
      Quantity,
      GrossProfitMargin,
      ProductCost,
      ProductRevenue
    } = obj

    await OrderDetails.create({
      OrderID: Math.floor(OrderID),
      ProductID,
      UnitPrice: Math.round(UnitPrice * 100),
      Quantity,
      GrossProfitMargin: Math.round(GrossProfitMargin * 1000),
      ProductCost: Math.round(ProductCost * 100),
      ProductRevenue: Math.round(ProductRevenue * 100)
    })
  } catch (error) {
    console.log(error);
  }
}

OrderDetails.testLoadSeed = function(obj) {
  let {OrderID, ProductID, UnitPrice, Quantity, Discount, GrossProfitMargin} = obj
  if (!Discount) {
    Discount = 0;
  }
  return {
    OrderID,
    ProductID,
    UnitPrice: Math.round(UnitPrice * 100),
    Quantity,
    Discount: Math.round(Discount * 100),
    GrossProfitMargin: Math.round(GrossProfitMargin * 1000)
  }
}

module.exports = OrderDetails

