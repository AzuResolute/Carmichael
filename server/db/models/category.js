const Sequelize = require('sequelize')
const db = require('../db')

const Category = db.define('category', {
  CategoryID: {
    type: Sequelize.INTEGER,
    primaryKey: true
  },
  CategoryName: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true
    }
  },
  Description: {
    type: Sequelize.STRING(500)
  }
})

Category.loadSeed = async function(obj) {
  let {CategoryID, CategoryName, Description} = obj
  await Category.create({
    CategoryID,
    CategoryName,
    Description
  })
}

module.exports = Category

//CategoryID	CategoryName	Description
