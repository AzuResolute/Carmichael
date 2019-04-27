const Sequelize = require('sequelize')
const db = require('../db')
const {DateExcel2JavaScript} = require('../../../utilities')

const Order = db.define('order', {
  OrderID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  // CustomerID will be given as a FK via relationship
  OrderDate: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: true
    }
  },
  RequiredDate: {
    type: Sequelize.DATE,
    validate: {
      notEmpty: true
    }
  },
  ShippedDate: {
    type: Sequelize.DATE,
    defaultValue: null
  },
  Freight: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // in cents
  },
  TotalCost: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // in cents
  },
  TotalRevenue: {
    type: Sequelize.INTEGER,
    defaultValue: 0
    // in cents
  },
},{
  timestamps: false
  }
)

Order.loadSeed = async function(obj) {
  let {OrderID, CustomerID, OrderDate, RequiredDate, ShippedDate, Freight, TotalCost, TotalRevenue} = obj
  await Order.create({
    OrderID,
    CustomerID,
    OrderDate: DateExcel2JavaScript(OrderDate),
    RequiredDate: DateExcel2JavaScript(RequiredDate),
    ShippedDate: DateExcel2JavaScript(ShippedDate),
    Freight: Math.round(Freight * 100),
    TotalCost: Math.round(TotalCost * 100),
    TotalRevenue: Math.round(TotalRevenue * 100),
  });
}

module.exports = Order

// OrderID	CustomerID		OrderDate	RequiredDate	ShippedDate	Freight	ShipName	ShipAddress	ShipCity	ShipRegion	ShipPostalCode	ShipCountry

// EmployeeID
