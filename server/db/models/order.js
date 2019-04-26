const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order',{
  OrderID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  // CustomerID will be given as a FK via relationship

})

Order.loadSeed = async function(obj) {

}

// OrderID	CustomerID	EmployeeID	OrderDate	RequiredDate	ShippedDate	Freight	ShipName	ShipAddress	ShipCity	ShipRegion	ShipPostalCode	ShipCountry