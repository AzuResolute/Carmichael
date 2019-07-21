const router = require('express').Router()
const {Customer, Order, Product, OrderDetails} = require('../db/models')

router.get('/customers', async (request, response, next) => {
  try {
    let allCusts = await Customer.findAll()
    response.json(allCusts)
  } catch (error) {
    console.log(error)
  }
})

router.get('/target/:OrderID', async (request, response, next) => {
  try {
    let {OrderID} = request.params
    let targetOrder = await Order.findOne({where:{
      OrderID
    },
    include: [{model: Product}]
  })
    response.json(targetOrder)
  } catch (error) {
    console.error(error)
  }
})

router.post('/OrderRequest', async (request, response, next) => {
  try {
    let {InvoiceNumber, SelectedCustomer, DeliveryTime, Cart, Freight, TotalRevenue, TotalCost} = request.body

    let newOrder = await Order.create({
      OrderID: InvoiceNumber,
      CustomerID: SelectedCustomer,
      OrderDate: Date.now(),
      RequiredDate: new Date(Date.now() + DeliveryTime * 24 * 60 * 60 * 1000),
      Freight, TotalRevenue, TotalCost
    })

    for(let i = 0; i < Cart.length; i++) {
      let {ProductID, UnitCost, Quantity, GrossProfitMargin, ProductCost, ProductRevenue} = Cart[i]
      await OrderDetails.create({
        OrderID: InvoiceNumber,
        ProductID,
        UnitPrice: UnitCost,
        Quantity, GrossProfitMargin, ProductCost, ProductRevenue
      })
    }

    response.json(newOrder.OrderID);

  } catch (error) {
    console.log(error)
  }

})

// OrderDate	RequiredDate	ShippedDate	Freight	ShipName	ShipAddress	ShipCity	ShipRegion	ShipPostalCode	ShipCountry	TotalCost	TotalRevenue

router.get('/:sortBy/:sortOrder', async (request, response, next) => {
  try {
    let {sortBy,sortOrder} = request.params
    let allOrders = await Order.findAll({
      order: [[sortBy, sortOrder]],
      // include: [{model: Product}]
    })
    response.json(allOrders)
  } catch (error) {
    console.log(error)
  }
})
//good

router.get('/:sortBy/:sortOrder/:CustomerID', async (request, response, next) => {
  try {
    let {sortBy,sortOrder, CustomerID} = request.params
    let allOrders = await Order.findAll({
      where: {
        CustomerID
      },
      order: [[sortBy, sortOrder]],
      // include: [{model: Product}]
    })
    response.json(allOrders)
  } catch (error) {
    console.log(error)
  }
})

router.get('/incProducts/:sortBy/:sortOrder/:CustomerID', async (request, response, next) => {
  try {
    let {sortBy,sortOrder, CustomerID} = request.params
    let allOrders = await Order.findAll({
      where: {
        CustomerID
      },
      order: [[sortBy, sortOrder]],
      include: [{model: Product}]
    })
    response.json(allOrders)
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
