import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromOrdersByCustomerThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {getAllCategoriesThunk} from '../../store/inventory'
import * as d3 from "d3"

class RevenueDashboard extends Component {
  constructor() {
    super()
    this.state = {
      currentCustomer: 'ALFKI',
      colors: [
        'white', 'violet', 'red', 'orange', 'aquamarine', 'yellow', 'green',  'blue'
      ],
      viewMode: 'ProductRevenue',
      activated: false,
      CustomerRevenue: 0,
      CustomerExpenses: 0,
      Demand: 0
    }
  }

  async componentDidMount() {
    await this.props.onLoadCategories()
    await this.props.onLoadCustomers()
    await this.props.onLoadOrders(
      'OrderID',
      'ASC',
      this.state.currentCustomer
    )
  }

  customerHandler = async evt => {
    await this.setState({
      currentCustomer: evt.target.value
    })
    this.props.onLoadOrders(
      'OrderID',
      'ASC',
      this.state.currentCustomer
    )
  }

  viewModeHandler = evt => {
    this.setState({
      viewMode: evt.target.value
    })
  }

  activateGraph = async () => {
    const {products} = this.props
    const {viewMode} = this.state
    const max = 400
    const barWidth = 40
    const barPadding = 5
    const minimum = 1
    const xStart = 160
    const yStart = 500
    let CustomerRevenue = 0
    let CustomerExpenses = 0
    let Demand = 0
    let high = minimum

    const data = [
      {"width": barWidth, height: minimum, "fill": "white"},
      {"width": barWidth, height: minimum, "fill": "violet"},
      {"width": barWidth, height: minimum, "fill": "red"},
      {"width": barWidth, height: minimum, "fill": "orange"},
      {"width": barWidth, height: minimum, "fill": "aquamarine"},
      {"width": barWidth, height: minimum, "fill": "yellow"},
      {"width": barWidth, height: minimum, "fill": "green"},
      {"width": barWidth, height: minimum, "fill": "blue"},
      ]

    products.forEach(prod => {
      data[prod.CategoryID -1].height = Number(prod.orderdetail[viewMode]) + data[prod.CategoryID -1].height
      if(data[prod.CategoryID -1].height > high) {
        high = data[prod.CategoryID -1].height
      }

      CustomerRevenue = Number(prod.orderdetail.ProductRevenue) + CustomerRevenue
      CustomerExpenses += Number(prod.orderdetail.ProductCost)
      Demand += Number(prod.orderdetail.Quantity)
    })

    if(high > max) {
      data.map(elem => {
        elem.height = Math.max(elem.height * (max / high),minimum)
      })
    }

    await this.setState({
      activated: true,
      CustomerRevenue, CustomerExpenses, Demand
    })

    const canvas = d3.select(".canva")
    const svg = canvas.append("svg")
                      .attr("width",600)
                      .attr("height",600)

    const xaxisline = svg.append("line")
                         .attr("y1", yStart + 1)
                         .attr("y2", yStart + 1)
                         .attr("x1", xStart - 20)
                         .attr("x2", xStart + (barWidth * data.length) + (barPadding * (data.length - 1)) + 20)
                         .attr("stroke-width", 2)
                         .attr("stroke", "black")

    const yaxisline = svg.append("line")
                         .attr("y1", yStart + 1)
                         .attr("y2", yStart - max)
                         .attr("x1", xStart - 20)
                         .attr("x2", xStart - 20)
                         .attr("stroke-width", 2)
                         .attr("stroke", "black")

    const baseTier = svg.append("text")
                        .attr("x", xStart - 100)
                        .attr("y", yStart + 1)
                        .attr("font-family", "sans-serif")
                        .text(`$${Math.floor((minimum/100)).toFixed(2)}`)

    const firstTierLine = svg.append("line")
                        .attr("y1", yStart - max / 4)
                        .attr("y2", yStart - max / 4)
                        .attr("x1", xStart - 19)
                        .attr("x2", xStart + (barWidth * data.length) + (barPadding * (data.length - 1)) + 20)
                        .attr("stroke-width", 2)
                        .attr("stroke", "gray")

    const secondTier = svg.append("text")
                        .attr("x", xStart - 100)
                        .attr("y", yStart - max/2)
                        .attr("font-family", "sans-serif")
                        .text(`$${Math.floor((high/100)/2).toFixed(2)}`)

    const secondTierLine = svg.append("line")
                        .attr("y1", yStart - max / 2)
                        .attr("y2", yStart - max / 2)
                        .attr("x1", xStart - 19)
                        .attr("x2", xStart + (barWidth * data.length) + (barPadding * (data.length - 1)) + 20)
                        .attr("stroke-width", 2)
                        .attr("stroke", "gray")

    const thirdTierLine = svg.append("line")
                        .attr("y1", yStart - max / 4 * 3)
                        .attr("y2", yStart - max / 4 * 3)
                        .attr("x1", xStart - 19)
                        .attr("x2", xStart + (barWidth * data.length) + (barPadding * (data.length - 1)) + 20)
                        .attr("stroke-width", 2)
                        .attr("stroke", "gray")

    const fourthTier = svg.append("text")
                        .attr("x", xStart - 100)
                        .attr("y", yStart - max)
                        .attr("font-family", "sans-serif")
                        .text(`$${Math.floor((high/100)).toFixed(2)}`)

    const fourthTierLine = svg.append("line")
                        .attr("y1", yStart - max )
                        .attr("y2", yStart - max )
                        .attr("x1", xStart - 19)
                        .attr("x2", xStart + (barWidth * data.length) + (barPadding * (data.length - 1)) + 20)
                        .attr("stroke-width", 2)
                        .attr("stroke", "gray")

    // const title = svg.append("Line")
    //                  .attr("x", xStart + (barWidth * data.length)/2)
    //                  .attr("y", yStart - max - 20)

    const rect = svg.selectAll("rect");

    rect.data(data)
              .enter().append("rect")
              .attr("width", (d, i) => d.width)
              .attr("height", (d, i) => d.height)
              .attr("fill", (d, i) => d.fill)
              .attr("x", (d,i) => xStart + i * (d.width + barPadding))
              .attr("y", (d,i) => yStart - d.height)
  }

  deactivateGraph = () => {
    this.setState({
      activated: false
    })
  }

  render() {
    let {customers, orders, products, categories} = this.props
    let {colors, activated, CustomerRevenue, CustomerExpenses, Demand} = this.state
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
          <td>Total Revenue</td>
          <td>${(CustomerRevenue/100).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Total Expenses</td>
          <td>${(CustomerExpenses/100).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Gross Profit</td>
          <td>${((CustomerRevenue - CustomerExpenses)/100).toFixed(2)}</td>
        </tr>
      </table>
    )
    return (
      <div className="Container">
        <div className="ReportingOptions">

          <div className="OptionComponent">
            <div>Customers: </div>
            <select
              name="customers"
              size="1" onChange={this.customerHandler}
            >
              {customers.map(cust => (
                <option key={cust.CustomerID} value={cust.CustomerID}>
                  {cust.CompanyName} ({cust.CustomerID})
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Customers: </div>
            <select
              name="graphOption"
              size="1"
              onClick = {this.viewModeHandler}
            >
              <option value="ProductRevenue" selected>Revenue</option>
              <option value="ProductExpenses">Expenses</option>
            </select>
          </div>

          <div className="OptionComponent">
            {!activated ?
              <div className="SubmitOrder Ready" onClick={this.activateGraph}> Activate Financials </div>
            :
              <div className="SubmitOrder" onClick={this.deactivateGraph}> Deactivate Financials </div>
            }
          </div>
        </div>


        {activated ?
        <div className = "ReportingOptions">
          <div className = "Legend">
            <table>

                {categories.map((cat,i) => (
                  <tr key={cat.CategoryID}>
                    <td  style={{backgroundColor: colors[i]}}>{cat.CategoryName}</td>
                  </tr>
                ))}
            </table>

          </div>
          <div className = "canva"/>
          {Financials()}
        </div>
          : null}
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
