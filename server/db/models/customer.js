const Sequelize = require('sequelize')
const db = require('../db')

const Customer = db.define('customer', {
  CustomerID: {
    type: Sequelize.STRING,
    primaryKey: true
  },
  CompanyName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  ContactName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  ContactTitle: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  }
})

Customer.loadSeed = async function(obj) {
  let {CustomerID, CompanyName, ContactName, ContactTitle} = obj
  await Customer.create({
    CustomerID,
    CompanyName,
    ContactName,
    ContactTitle
  })
}

module.exports = Customer

// CustomerID	CompanyName	ContactName	ContactTitle
