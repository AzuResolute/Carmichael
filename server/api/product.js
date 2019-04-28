const router = require('express').Router()
const {Product, Category} = require('../db/models')

router.get('/categories', async (request, response, next) => {
  try {
    let allCats = await Category.findAll()
    response.json(allCats)
  } catch (error) {
    console.log(error)
  }
})

router.get('/target/:ProductID', async (request, response, next) => {
  try {
    let {ProductID} = request.params
    let target = await Product.findOne({where:{
      ProductID
    }})
    response.json(target)
  } catch (error) {
    console.log(error)
  }
})

// router.put('/updateinventory/', async (request, response, next) => {
//   try {
//     let {ProductID, Quantity} = request.body
//     let target = await Product.findOne({where:{
//       ProductID
//     }})
//     let newQuantity = Math.max(target.UnitsInStock + Quantity,0)
//     await target.update({
//       UnitsInStock: newQuantity
//     })
//     response.json(target)
//   } catch (error) {
//     console.log(error)
//   }
// })

router.get('/:sortBy/:sortOrder', async (request, response, next) => {
  try {
    let {sortBy,sortOrder} = request.params
    let allProducts = await Product.findAll({
      order: [[sortBy, sortOrder]]
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
