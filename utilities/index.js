const XLSX = require('xlsx')
// const fs = require('fs')
const NorthwindPath =
  '/Users/janczarinajavier/Carmichael/utilities/Northwind.xls'
const OrderRequestPath =
  '/Users/janczarinajavier/Carmichael/utilities/OrderRequest.xlsx'
const UpdateInventoryPath =
  '/Users/janczarinajavier/Carmichael/utilities/UpdateInventory.xlsx'
const UpdateInventoryPathBackUp =
  '/Users/janczarinajavier/Carmichael/utilities/UpdateInventory.xlsx'
const Test = '/Users/janczarinajavier/Carmichael/utilities/test.xlsx'
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

const DateExcel2JavaScript = function(date) {
  let day = new Date((date - 25567) * 86400 * 1000)
  if (Object.prototype.toString.call(day) === '[object Date]') {
    if (isNaN(day.getTime())) {
      // d.valueOf() could also work
    } else {
      return day
    }
  }
}

const SeedSheetLoader = sheetNum => {
  const Northwind = XLSX.readFile(NorthwindPath)

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
      Northwind.Sheets[Northwind.SheetNames[sheetNum]][`${abc[1]}${rowCounter}`]
  } while (nextCol)

  return dataArr
}

const OrderRequestToExcel = state => {
  const {
    InvoiceNumber,
    SelectedCustomer,
    DeliveryTime,
    Freight,
    TotalCost,
    TotalRevenue,
    Cart
  } = state
  let wb = XLSX.utils.book_new()
  wb.SheetNames.push('InvoiceDetails')

  let data = [
    ['Invoice Number: ', InvoiceNumber],
    ['Customer ID: ', SelectedCustomer],
    ['Date Ordered: ', Date(Date.now()).slice(0, 15)],
    [
      'Date Required: ',
      String(new Date(Date.now() + DeliveryTime * 24 * 60 * 60 * 1000)).slice(
        0,
        15
      )
    ],
    ['Freight:', `$${(Freight / 100).toFixed(2)}`],
    ['Total Cost: ', `$${(TotalCost / 100).toFixed(2)}`],
    ['Total Revenue: ', `$${(TotalRevenue / 100).toFixed(2)}`],
    []
  ]

  let cartProps = Object.keys(Cart[0])

  data.push(cartProps)

  for (let i = 0; i < Cart.length; i++) {
    let {
      ProductID,
      ProductName,
      UnitCost,
      UnitRevenue,
      Quantity,
      GrossProfitMargin,
      ProductCost,
      ProductRevenue
    } = Cart[i]

    data.push([
      ProductID,
      ProductName,
      `$${(UnitCost / 100).toFixed(2)}`,
      `$${(UnitRevenue / 100).toFixed(2)}`,
      Quantity,
      GrossProfitMargin,
      `$${(ProductCost / 100).toFixed(2)}`,
      `$${(ProductRevenue / 100).toFixed(2)}`
    ])
  }

  let ws = XLSX.utils.aoa_to_sheet(data)
  wb.Sheets['InvoiceDetails'] = ws

  XLSX.writeFile(wb, OrderRequestPath)
}

const UpdateInventoryThroughExcel = async () => {

  const UpdateInventory = await XLSX.readFile(UpdateInventoryPath)

  let dataArr = []

  let currentSheet = UpdateInventory.Sheets[UpdateInventory.SheetNames[0]]

  for(let i = 9; i <= 20; i++) {
    let ProductName = currentSheet[`B${i}`] ? currentSheet[`B${i}`].v : null
    let ProductID = currentSheet[`C${i}`] ? currentSheet[`C${i}`].v : null
    let Quantity = currentSheet[`D${i}`] ? currentSheet[`D${i}`].v : null
    if(ProductName && Quantity) {
      dataArr.push({ProductName, ProductID, Quantity})
    }
  }

  console.log(dataArr)

  return dataArr
}

module.exports = {DateExcel2JavaScript, SeedSheetLoader, OrderRequestToExcel, UpdateInventoryThroughExcel}
