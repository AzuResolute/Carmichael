const router = require('express').Router()
const {Product} = require('../db/models')
const {Category} = require('../db/models')

router.get('/', async (request, response, next) => {
  try {
    let allProducts = await Product.findAll()
    response.json(allProducts)
  } catch (error) {
    console.log(error)
  }
})

router.get('/categories', async (request, response, next) => {
  try {
    let allCats = await Category.findAll()
    response.json(allCats)
  } catch (error) {
    console.log(error)
  }
})

router.get('/:CategoryID', async (request, response, next) => {
  try {
    let {CategoryID} = request.params
    let productsByCat = await Product.findAll({ where:{
      CategoryID
    }})
    response.json(productsByCat)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
