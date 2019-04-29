import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getAllOrdersThunk,
  getOrdersByCustomersThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {NumberWithCommas} from '../../../utilities'

class OrdersReporting extends Component {
  constructor() {
    super()
    this.state = {
      currentCustomer: 'All Customers',
      currentSortBy: 'OrderID',
      currentSortOrder: 'ASC'
    }
  }

  componentDidMount() {
    this.props.onLoadCustomers()
    this.props.onLoadOrders(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCustomer
    )
  }

  customerHandler = async evt => {
    await this.setState({
      currentCustomer: evt.target.value
    })
    this.props.onLoadOrders(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCustomer
    )
  }

  sortbyHandler = async evt => {
    await this.setState({
      currentSortBy: evt.target.value
    })
    this.props.onLoadOrders(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCustomer
    )
  }

  sortorderHandler = async evt => {
    await this.setState({
      currentSortOrder: evt.target.value
    })
    this.props.onLoadOrders(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCustomer
    )
  }

  render() {
    let {customers, orders} = this.props
    let orderProps = [
      'OrderID',
      'CustomerID',
      'OrderDate',
      'RequiredDate',
      'ShippedDate',
      'Freight',
      'TotalCost',
      'TotalRevenue'
    ]
    if (!orders) {
      return <div> Loading ... </div>
    }
    return (
      <div className="Container">
        <div className="ReportingOptions">
          <div className="OptionComponent">
            <div>Customers: </div>
            <select name="customers" size="1" onChange={this.customerHandler}>
              <option value="All Customers">All Customers</option>
              {customers.map(cust => (
                <option key={cust.CustomerID} value={cust.CustomerID}>
                  {cust.CompanyName} ({cust.CustomerID})
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Sort By: </div>
            <select name="sortBy" size="1" onChange={this.sortbyHandler}>
              {orderProps.map(prop => (
                <option key value={prop}>
                  {prop}
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Sort Order: </div>
            <select name="sortOrder" size="1" onChange={this.sortorderHandler}>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>
        <table>
          <tr>{orderProps.map(key => <th key>{key}</th>)}</tr>

          {orders.map(ord => (
            <tr key={ord.OrderID}>
              <td>{ord.OrderID}</td>
              <td>{ord.CustomerID}</td>
              <td>{ord.OrderDate.slice(0, 10)}</td>
              <td>{ord.RequiredDate.slice(0, 10)}</td>
              <td>{ord.ShippedDate ? ord.ShippedDate.slice(0, 10) : 'None'}</td>
              <td>${NumberWithCommas((ord.Freight / 100).toFixed(2))}</td>
              <td>${NumberWithCommas((ord.TotalCost / 100).toFixed(2))}</td>
              <td>${NumberWithCommas((ord.TotalRevenue / 100).toFixed(2))}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.orders.orders,
  customers: state.orders.customers
})

const mapDispatchToProps = dispatch => ({
  onLoadOrders: (sortBy, sortOrder, id) => {
    if (id === 'All Customers') {
      dispatch(getAllOrdersThunk(sortBy, sortOrder))
    } else {
      dispatch(getOrdersByCustomersThunk(sortBy, sortOrder, id))
    }
  },
  onLoadCustomers: () => {
    dispatch(getAllCustomersThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrdersReporting)
