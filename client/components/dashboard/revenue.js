import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromOrdersByCustomerThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {getAllCategoriesThunk} from '../../store/inventory'
import {NumberWithCommas} from '../../../utilities/'
import {CategoryPieChart} from '../../../utilities/D3Components'
import * as d3 from 'd3'

class RevenueDashboard extends Component {
  constructor() {
    super()
    this.state = {
      currentCustomer: 'ALFKI',
      colors: [
        'white',
        'violet',
        'red',
        'orange',
        'aquamarine',
        'yellow',
        'green',
        'blue'
      ],
      viewMode: 'Select an Account',
      activated: false,
      CustomerRevenue: 0,
      CustomerExpenses: 0,
      Demand: 0,
      data: []
    }
  }

  async componentDidMount() {
    await this.props.onLoadCategories()
    await this.props.onLoadCustomers()
    await this.props.onLoadOrders('OrderID', 'ASC', this.state.currentCustomer)
  }

  customerHandler = async evt => {
    await this.setState({
      currentCustomer: evt.target.value
    })
    this.props.onLoadOrders('OrderID', 'ASC', this.state.currentCustomer)
  }

  viewModeHandler = evt => {
    this.setState({
      viewMode: evt.target.value
    })
  }

  activate = async () => {
    // const {products} = this.props
    // const {viewMode} = this.state
    // let CustomerRevenue = 0
    // let CustomerExpenses = 0
    // let Demand = 0

    // const data = [
    //   {height: 0, fill: 'white'},
    //   {height: 0, fill: 'violet'},
    //   {height: 0, fill: 'red'},
    //   {height: 0, fill: 'orange'},
    //   {height: 0, fill: 'aquamarine'},
    //   {height: 0, fill: 'yellow'},
    //   {height: 0, fill: 'green'},
    //   {height: 0, fill: 'blue'}
    // ]

    // await products.forEach(prod => {
    //   // data[prod.CategoryID - 1].height =
    //   //   Number(prod.orderdetail[viewMode]) + data[prod.CategoryID - 1].height

    //   CustomerRevenue =
    //     Number(prod.orderdetail.ProductRevenue) + CustomerRevenue
    //   CustomerExpenses += Number(prod.orderdetail.ProductCost)
    //   Demand += Number(prod.orderdetail.Quantity)
    // })
    await this.activateBriteChartGraph()
    this.setState({
      activated: true,
    })

    // const canvas = d3.select('.canva')

    // BarGraphify(canvas, data, dimensions, margin, axisIntervals, viewMode)
    // Redo Revenue using BriteCharts
    // await BarGraphify(canvas, data, 600, 100, 4, viewMode)
  }

  activateBriteChartGraph = async () => {
    const {products, categories} = this.props
    const {viewMode} = this.state
    let CustomerRevenue = 0
    let CustomerExpenses = 0
    let Demand = 0

    const data = await products.reduce((accum, prod) => {
      let prodCat = categories[[prod.CategoryID]-1].CategoryName
      if(!accum[prodCat]) {
        accum[prodCat] = {
          quantity: Number((prod.orderdetail[viewMode]/100).toFixed(2)),
          name: prodCat
        }
      }
      else {
        accum[prodCat].quantity = accum[prodCat].quantity + Number((prod.orderdetail[viewMode]/100).toFixed(2))
      }

      CustomerRevenue = Number(prod.orderdetail.ProductRevenue) + CustomerRevenue
      CustomerExpenses += Number(prod.orderdetail.ProductCost)
      Demand += Number(prod.orderdetail.Quantity)

      return accum
    }, {})

    this.setState({
      CustomerRevenue,
      CustomerExpenses,
      Demand,
      data: Object.values(data)
    })
  }

  deactivate = () => {
    this.setState({
      activated: false,
    })
  }

  Financials = (Demand, CustomerRevenue, CustomerExpenses) => (
    <table>
      <tr>
        <th>Description</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Client</td>
        <td>{this.state.currentCustomer}</td>
      </tr>
      <tr>
        <td>Purchases</td>
        <td>{NumberWithCommas(Demand)}</td>
      </tr>
      <tr>
        <td>Total Revenue</td>
        <td>${NumberWithCommas((CustomerRevenue / 100).toFixed(2))}</td>
      </tr>
      <tr>
        <td>Total Costs</td>
        <td>${NumberWithCommas((CustomerExpenses / 100).toFixed(2))}</td>
      </tr>
      <tr>
        <td>Gross Profit</td>
        <td>
          ${NumberWithCommas(
            ((CustomerRevenue - CustomerExpenses) / 100).toFixed(2)
          )}
        </td>
      </tr>
      <tr>
        <td>Gross Profit Margin</td>
        <td>{(((CustomerRevenue - CustomerExpenses) / CustomerRevenue) * 100).toFixed(2)}%</td>
      </tr>
    </table>
  )

  render() {
    let {customers, orders, categories, products} = this.props
    let {viewMode, data} = this.state
    let {
      colors,
      activated,
      CustomerRevenue,
      CustomerExpenses,
      Demand
    } = this.state
    if (orders.length === 0 || categories.length === 0) {
      return <div> Loading ... </div>
    }
    else
    {
      return (
        <div className="Container">
          <div className="ReportingOptions">
            {!activated ? (
              <div className="OptionComponent">
                <div>Client: </div>
                <select name="customers" size="1" onChange={this.customerHandler}>
                  {customers.map(cust => (
                    <option key={cust.CustomerID} value={cust.CustomerID}>
                      {cust.CompanyName} ({cust.CustomerID})
                    </option>
                  ))}
                </select>
              </div>
            ) : null}

            {!activated ? (
              <div className="OptionComponent">
                <div>Account: </div>
                <select
                  name="graphOption"
                  size="1"
                  onChange={this.viewModeHandler}
                >
                  <option value="Select an Account">Select an Account</option>
                  <option value="ProductRevenue">Revenue</option>
                  <option value="ProductCost">Expenses</option>
                </select>
              </div>
            ) : null}

            <div className="OptionComponent">
              {activated ? (
                <div className="SubmitOrder" onClick={this.deactivate}>
                  Deactivate Financials
                </div>
              ) : viewMode !== 'Select an Account' ? (
                <div className="SubmitOrder Ready" onClick={this.activate}>
                  Activate Financials
                </div>
              ) : (
                <div className="SubmitOrder False">Select an Account</div>
              )}
            </div>
          </div>

          {activated ? (
            <div className="ReportingOptions">
              <CategoryPieChart
                data={data} viewMode={viewMode}/>
              {this.Financials(Demand, CustomerRevenue, CustomerExpenses)}
            </div>
          ) : null}
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  categories: state.inventory.categories,
  orders: state.orders.orders,
  customers: state.orders.customers,
  products: state.orders.productsFromOrders
})

const mapDispatchToProps = dispatch => ({
  onLoadCategories: () => {
    dispatch(getAllCategoriesThunk())
  },
  onLoadOrders: (sortBy, sortOrder, id) => {
    dispatch(getProductsFromOrdersByCustomerThunk(sortBy, sortOrder, id))
  },
  onLoadCustomers: () => {
    dispatch(getAllCustomersThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(RevenueDashboard)
