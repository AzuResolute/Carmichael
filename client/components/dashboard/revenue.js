import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromOrdersByCustomerThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {getAllCategoriesThunk} from '../../store/inventory'
import {BarGraphify, NumberWithCommas} from '../../../utilities/'
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
      Demand: 0
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

  activateGraph = async () => {
    const {products} = this.props
    const {viewMode} = this.state
    const dimensions = 600
    const margin = 100
    const max = 400
    const minimum = 1
    let CustomerRevenue = 0
    let CustomerExpenses = 0
    let Demand = 0
    let high = minimum

    const data = [
      {height: minimum, fill: 'white'},
      {height: minimum, fill: 'violet'},
      {height: minimum, fill: 'red'},
      {height: minimum, fill: 'orange'},
      {height: minimum, fill: 'aquamarine'},
      {height: minimum, fill: 'yellow'},
      {height: minimum, fill: 'green'},
      {height: minimum, fill: 'blue'}
    ]

    await products.forEach(prod => {
      data[prod.CategoryID - 1].height =
        Number(prod.orderdetail[viewMode]) + data[prod.CategoryID - 1].height
      if (data[prod.CategoryID - 1].height > high) {
        high = data[prod.CategoryID - 1].height
      }

      CustomerRevenue =
        Number(prod.orderdetail.ProductRevenue) + CustomerRevenue
      CustomerExpenses += Number(prod.orderdetail.ProductCost)
      Demand += Number(prod.orderdetail.Quantity)
    })

    if (high > max) {
      data.map(elem => {
        elem.height = Math.max(elem.height * (max / high), minimum)
      })
    }

    await this.setState({
      activated: true,
      CustomerRevenue,
      CustomerExpenses,
      Demand
    })

    const canvas = d3.select('.canva')
    const svg = canvas
      .append('svg')
      .attr('width', dimensions)
      .attr('height', dimensions)

    await BarGraphify(svg, data, dimensions, max, high, margin, viewMode)
  }

  deactivateGraph = () => {
    this.setState({
      activated: false
    })
  }

  render() {
    let {customers, orders, categories} = this.props
    let {viewMode} = this.state
    let {
      colors,
      activated,
      CustomerRevenue,
      CustomerExpenses,
      Demand
    } = this.state
    if (!orders) {
      return <div> Loading ... </div>
    }

    const Financials = () => (
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
          <td>Efficiency Ratio</td>
          <td>{(CustomerExpenses / CustomerRevenue).toFixed(4)}</td>
        </tr>
      </table>
    )

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
              <div className="SubmitOrder" onClick={this.deactivateGraph}>
                Deactivate Financials
              </div>
            ) : viewMode !== 'Select an Account' ? (
              <div className="SubmitOrder Ready" onClick={this.activateGraph}>
                Activate Financials
              </div>
            ) : (
              <div className="SubmitOrder False">Select an Account</div>
            )}
          </div>
        </div>

        {activated ? (
          <div className="ReportingOptions">
            <div className="Legend">
              <table>
                {categories.map((cat, i) => (
                  <tr key={cat.CategoryID}>
                    <td style={{backgroundColor: colors[i]}}>
                      {cat.CategoryName}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
            <div className="canva" />
            {Financials()}
          </div>
        ) : null}
      </div>
    )
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
