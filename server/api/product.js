const router = require('express').Router()
const {Product} = require('../db/models')
const {Category} = require('../db/models')

router.get('/categories', async (request, response, next) => {
  try {
    let allCats = await Category.findAll()
    response.json(allCats)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:sortBy/:sortOrder', async (request, response, next) => {
  try {
    let allProducts = await Product.findAll({
      order: [[request.params.sortBy, request.params.sortOrder]]
    })
    response.json(allProducts)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:sortBy/:sortOrder/:CategoryID', async (request, response, next) => {
  try {
    let {sortBy,CategoryID,sortOrder} = request.params
    let productsByCat = await Product.findAll({
      where: {
        CategoryID
      },
      order: [[sortBy, sortOrder]]
    })
    response.json(productsByCat)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
