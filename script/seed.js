'use strict'

const db = require('../server/db')
const {User, Product, Category, Order, OrderDetails, Customer} = require('../server/db/models')
const XLSX = require('xlsx')
const abc = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  10: 'J',
  11: 'K',
  12: 'L',
  13: 'M',
  14: 'N',
  15: 'O',
  16: 'P',
  17: 'Q',
  18: 'R'
}

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])

  const SeedSheetLoader = sheetNum => {
    const Northwind = XLSX.readFile(
      '/Users/janczarinajavier/Carmichael/utilities/Northwind.xls'
    )

    let dataProps = []
    let dataArr = []
    let targetValue,
      nextCol,
      rowCounter = 1
    let emptyColumn = 2

    do {
      let colCounter = 1
      let data = {}

      do {
        let currentSheet = Northwind.Sheets[Northwind.SheetNames[sheetNum]]
        let targetCell = currentSheet[`${abc[colCounter]}${rowCounter}`]
        targetValue = targetCell ? targetCell.v : null

        if (targetValue && rowCounter === 1) {
          dataProps.push(targetValue)
          emptyColumn++
        } else if (targetValue) {
          data[dataProps[colCounter - 1]] = targetValue
        }

        colCounter++
      } while (colCounter < emptyColumn)
      if (rowCounter !== 1) {
        dataArr.push(data)
      }
      rowCounter++
      nextCol =
        Northwind.Sheets[Northwind.SheetNames[sheetNum]][
          `${abc[1]}${rowCounter}`
        ]
    } while (nextCol)

    return dataArr
  }

  let seedCategory = SeedSheetLoader(0);
  let seedProduct = SeedSheetLoader(5);
  let seedCustomer = SeedSheetLoader(1);
  let seedOrder = SeedSheetLoader(4);
  let seedOrderDetails = SeedSheetLoader(3);

  for(let i = 0; i < seedCategory.length; i++) {
    await Category.loadSeed(seedCategory[i]);
  }

  console.log("Cat Complete");

  for(let i = 0; i < seedProduct.length; i++) {
    await Product.loadSeed(seedProduct[i]);
  }

  console.log("Prod Complete");

  for(let i = 0; i < seedCustomer.length; i++) {
    await Customer.loadSeed(seedCustomer[i]);
  }

  console.log("Cust Complete");

  for(let i = 0; i < seedOrder.length; i++) {
    await Order.loadSeed(seedOrder[i]);
  }

  console.log("Order Complete");

  for(let i = 0; i < seedOrderDetails.length; i++) {
    await OrderDetails.loadSeed(seedOrderDetails[i]);
  }

  console.log("OrderDetails Complete");

  // let arr = [];
  // for(let i = 0; i < seedOrderDetails.length; i++) {
  //   arr.push(OrderDetails.testLoadSeed(seedOrderDetails[i]));
  // }

  // console.log(arr);

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
