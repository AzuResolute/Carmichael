import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getProductsFromOrdersByCustomerThunk,
  getAllCustomersThunk
} from '../../store/orders'
import {getAllCategoriesThunk} from '../../store/inventory'
import {NumberWithCommas} from '../../../utilities'

class CustomerAccountsReporting extends Component {
  constructor() {
    super()
    this.state = {
      currentCustomer: 'ALFKI',
      currentSortBy: 'OrderID',
      currentSortOrder: 'ASC'
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

  render() {
    let {customers, orders, products, categories} = this.props
    let productProps = [
      'OrderID', 'ProductID', 'ProductName', 'Category', 'Quantity', 'UnitCost', 'Cost', 'Revenue'
    ]
    if (!orders) {
      return <div> Loading ... </div>
    }
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

        </div>
        <table>
            <tr>{productProps.map(key => <th key>{key}</th>)}
            </tr>

            {products.map(prod => (
              <tr key={Number(`${String(prod.orderdetail.OrderID)}${String(prod.ProductID)}`)}>
                <td>{prod.orderdetail.OrderID}</td>
                <td>{prod.ProductID}</td>
                <td>{prod.ProductName}</td>
                <td>{categories[prod.CategoryID - 1].CategoryName}</td>
                <td>{NumberWithCommas(prod.orderdetail.Quantity)}</td>
                <td>${NumberWithCommas((prod.orderdetail.UnitPrice/100).toFixed(2))}</td>
                <td>${NumberWithCommas((prod.orderdetail.ProductCost/100).toFixed(2))}</td>
                <td>${NumberWithCommas((prod.orderdetail.ProductRevenue/100).toFixed(2))}</td>
              </tr>
            ))}

          </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(CustomerAccountsReporting)
