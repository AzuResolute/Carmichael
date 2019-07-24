import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromOrdersByCustomerThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {getAllCategoriesThunk} from '../../store/inventory'
import {NumberWithCommas, PropertySort} from '../../../utilities/'
import {
  CategoryPieChart,
  YearlyDeltaGroupBarChart,
  CategoryPieDataInit,
  YearlyDeltaDataInit
} from '../../../utilities/D3Components'

class RevenueDashboard extends Component {
  constructor() {
    super()
    this.state = {
      currentCustomerID: 'ALFKI',
      currentCustomerName: 'Alfreds Futterkiste',
      viewMode: 'Select an Account',
      activated: false,
      CustomerRevenue: 0,
      CustomerExpenses: 0,
      Demand: 0,
      pieData: [],
      yearlyDeltaData: []
    }
  }

  async componentDidMount() {
    await this.props.onLoadCategories()
    await this.props.onLoadCustomers()
    await this.props.onLoadOrders('OrderID', 'ASC', this.state.currentCustomerID)
  }

  customerHandler = async evt => {
    let customerProps = evt.target.value.split(',')
    await this.setState({
      currentCustomerID: customerProps[0],
      currentCustomerName: customerProps[1]
    })
    await this.props.onLoadOrders('OrderID', 'ASC', this.state.currentCustomerID)
    console.log(this.state)
  }

  viewModeHandler = evt => {
    this.setState({
      viewMode: evt.target.value
    })
  }

  activate = async () => {
    await this.activateBriteCharts()
    this.setState({
      activated: true,
    })
  }

  activateBriteCharts = async () => {
    const {products, categories, orders} = this.props
    const {viewMode} = this.state
    let CustomerRevenue = 0
    let CustomerExpenses = 0
    let Demand = 0

    const data = await products.reduce((accum, prod) => {
      let prodCat = categories[[prod.CategoryID]-1].CategoryName
      let year = orders.find(order => (order.OrderID === prod.orderdetail.OrderID)).OrderDate.slice(0,4)

        accum.pieData[prodCat].quantity = 
          accum.pieData[prodCat].quantity
          + Number((prod.orderdetail[viewMode]/100).toFixed(2))

      if(!accum.yearlyDeltaData[year]) {
        accum.yearlyDeltaData[year] = YearlyDeltaDataInit(year)
      }

        accum.yearlyDeltaData[year][prodCat].value =
          accum.yearlyDeltaData[year][prodCat].value
          + Number((prod.orderdetail[viewMode]/100).toFixed(2))

      CustomerRevenue = Number(prod.orderdetail.ProductRevenue) + CustomerRevenue
      CustomerExpenses += Number(prod.orderdetail.ProductCost)
      Demand += Number(prod.orderdetail.Quantity)

      return accum
    }, { pieData: CategoryPieDataInit, yearlyDeltaData: {}})

    const pieData = Object.values(data.pieData)
    const yearlyDeltaData = {
      figures: Object.values(data.yearlyDeltaData).map(
              elem => (Object.values(elem))
            ).reduce((accum, arr) => {
              arr.forEach(elem => {
                accum.push(elem)
              })
              return accum
            },[]),
      legend: Object.values(data.pieData)
    }

    this.setState({
      CustomerRevenue,
      CustomerExpenses,
      Demand,
      pieData,
      yearlyDeltaData
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
        <td>{this.state.currentCustomerID}</td>
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
    let {customers, orders, categories} = this.props
    let {
      activated,
      CustomerRevenue,
      CustomerExpenses,
      Demand,
      currentCustomerName,
      viewMode,
      pieData,
      yearlyDeltaData
    } = this.state
    if (orders.length === 0 || categories.length === 0) {
      return <div> Loading ... </div>
    }
    else
    {
      return (
        <div className="Container">
          <div className="Instructions">
            <div id="InstHeading">Instructions:</div>
          <div/>
          <div>Client - Select the Client whose figures you want to analyze</div>
          <div>Account - Select the Account you want to analyze</div>
          <div>Once both are chosen, the "Activate Financials" button will appear</div>
          <div>To change parameters, press "Deactivate Financials"</div>
        </div>
          <div className="ReportingOptions">
            {!activated ? (
              <div className="OptionComponent">
                <div>Client: </div>
                <select name="customers" size="1" onChange={this.customerHandler}>
                  {customers.map(cust => (
                    <option
                      key={cust.CustomerID}
                      value={`${cust.CustomerID},${cust.CompanyName}`}
                      style={{color: 'black'}}>
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
                  <option value="Select an Account" style={{color: 'black'}}>Select an Account</option>
                  <option value="ProductRevenue" style={{color: 'black'}}>Revenue</option>
                  <option value="ProductCost" style={{color: 'black'}}>Expenses</option>
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
                data={pieData}
                viewMode={viewMode}
                customer={currentCustomerName}
              />
              <YearlyDeltaGroupBarChart
                data={yearlyDeltaData}
                viewMode={viewMode}
                customer={currentCustomerName}
              />
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
