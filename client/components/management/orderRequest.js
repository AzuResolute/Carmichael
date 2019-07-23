import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProductsThunk, getTargetProductThunk} from '../../store/inventory'
import {
  getAllCustomersThunk,
  getAllOrdersThunk,
  createNewOrderThunk
} from '../../store/orders'
import {NumberWithCommas} from '../../../utilities'

class OrderReceived extends Component {
  constructor() {
    super()
    this.state = {
      InvoiceNumber: 0,
      SelectedCustomer: 'SELECT ID',
      DeliveryTime: 30,
      SelectedQuantity: 0,
      Cart: [],
      Freight: 0,
      TotalRevenue: 0,
      TotalCost: 0
    }
  }

  async componentDidMount() {
    this.props.onLoadProducts()
    this.props.onLoadCustomers()
    await this.props.onLoadOrders('OrderID', 'ASC')
  }

  customerHandler = async evt => {
    let {orders} = this.props
    await this.setState({
      InvoiceNumber: orders[orders.length - 1].OrderID + 1,
      SelectedCustomer: evt.target.value
    })
  }

  deliveryHandler = async evt => {
    await this.setState({
      DeliveryTime: evt.target.value
    })
  }

  currentProdHandler = async evt => {
    await this.props.onLoadTargetProduct(evt.target.value)
    document.querySelector('#QuantitySelector').value = 0
    await this.setState({
      SelectedQuantity: 0
    })
  }

  currentQuantityHandler = async evt => {
    await this.setState({
      SelectedQuantity: evt.target.value
    })
  }

  addToCart = async () => {
    if (this.props.targetProduct && this.state.SelectedQuantity > 0) {
      let {ProductID, ProductName, UnitPrice} = this.props.targetProduct
      let {
        SelectedQuantity,
        Cart,
        TotalRevenue,
        TotalCost,
        Freight
      } = this.state
      let gpm = 20
      let freightPrem = 75
      let prodToCart = {
        ProductID,
        ProductName,
        UnitCost: Number(UnitPrice),
        UnitRevenue: Number(UnitPrice * (1 + gpm / 100)),
        Quantity: SelectedQuantity,
        GrossProfitMargin: gpm,
        ProductCost: Number(UnitPrice) * Number(SelectedQuantity),
        ProductRevenue:
          Number(UnitPrice * (1 + gpm / 100)) * Number(SelectedQuantity)
      }
      let newCart = Cart.filter(prod => {
        return prod.ProductID !== ProductID
      })

      newCart.push(prodToCart)

      document.querySelector('#QuantitySelector').value = 0
      document.querySelector('#ProductSelector').value = 5

      await this.setState({
        Cart: newCart,
        SelectedQuantity: 0,
        Freight: Freight + freightPrem * SelectedQuantity,
        TotalRevenue:
          TotalRevenue +
          prodToCart.ProductRevenue +
          freightPrem * SelectedQuantity,
        TotalCost: TotalCost + prodToCart.ProductCost
      })
    }
  }

  removeFromCart = async evt => {
    let newCart = this.state.Cart
    newCart.splice(evt.target.value, 1)
    await this.setState({
      cart: newCart
    })
  }

  submitOrderRequest = () => {
    this.props.onCreateOrder(this.state)
  }

  render() {
    let {customers, products, targetProduct} = this.props
    let {
      DeliveryTime,
      Cart,
      TotalRevenue,
      SelectedCustomer,
      InvoiceNumber,
      Freight
    } = this.state
    let productProps = [
      '#',
      'ProductID',
      'ProductName',
      'Unit Price',
      'Quantity',
      'Product Total',
      ''
    ]
    let timing = {
      OneMonth: 30,
      TwoMonths: 60,
      ThreeMonths: 91,
      SixMonths: 183
    }
    let tableMinimumHeight = 10
    const QuantEnumerator = num => {
      let arr = []
      if (num === 0) {
        return [<option key={0} style={{color: 'black'}}>Out Of Stock</option>]
      }
      arr.push(
        <option value={0} selected style={{color: 'black'}}>
          {0}
        </option>
      )
      for (let i = 1; i <= num; i++) {
        arr.push(<option value={i} style={{color: 'black'}}>{i}</option>)
      }
      return arr
    }
    const TableEnumerator = num => {
      let arr = []
      for (let i = 0; i < num; i++) {
        arr.push(
          <tr>
            <td>{i + Cart.length + 1}</td>
            <td />
            <td />
            <td />
            <td />
            <td />
            <td>
              <button type="button" disabled>
                Remove
              </button>
            </td>
          </tr>
        )
      }
      return arr
    }
    return (
      <div className="Container">
        <div className="Header">
          <h3>Order Request</h3>
        </div>
        <form className="InputForm">
          <div className="OrderReqInfo">
            <div className="OptionComponent">
              {SelectedCustomer ? (
                <div>Invoice: {InvoiceNumber}</div>
              ) : (
                <div> Pending Invoice Number</div>
              )}
            </div>

            <div className="OptionComponent">
              <div>Today's Date: {Date(Date.now()).slice(0, 15)}</div>
            </div>

            <div className="OptionComponent">
              <div>
                Delivery Date:{' '}
                {String(
                  new Date(Date.now() + DeliveryTime * 24 * 60 * 60 * 1000)
                ).slice(0, 15)}
              </div>
            </div>

            <div className="OptionComponent">
              <div>Customers: </div>
              <select name="customers" size="1" onChange={this.customerHandler}>
                <option value="SELECT ID" style={{color: 'black'}}>Select ID</option>
                {customers.map(cust => (
                  <option
                    key={cust.CustomerID}
                    value={cust.CustomerID}
                    style={{color: 'black'}}>
                    {cust.CompanyName}
                  </option>
                ))}
              </select>
            </div>

            <div className="OptionComponent">
              <div>Delivery: </div>
              <select name="delivery" size="1" onChange={this.deliveryHandler}>
                {Object.keys(timing).map(prop => (
                  <option
                    key={prop.id}
                    value={timing[prop]}
                    style={{color: 'black'}}>
                    {prop}
                  </option>
                ))}
              </select>
            </div>

            {Cart.length && SelectedCustomer !== 'SELECT ID' ? (
              <div
                className="OptionComponent SubmitOrder"
                onClick={this.submitOrderRequest}
              >
                <div>Submit Order</div>
              </div>
            ) : (
              <div className="OptionComponent SubmitOrder False">
                <div>Submit Order</div>
              </div>
            )}
          </div>

          <div className="OrderReqPurchase">
            <div className="OptionComponent">
              <div>Select a Product to Add: </div>
              <select
                name="products"
                size="1"
                id="ProductSelector"
                onChange={this.currentProdHandler}
              >
                <option value={5} style={{color: 'black'}}>Select a Product</option>
                {products.map(prod => (
                  <option key={prod.ProductID} value={prod.ProductID} style={{color: 'black'}}>
                    {prod.ProductName}
                  </option>
                ))}
              </select>
            </div>

            <div className="OptionComponent">
              <div>Quantity: </div>
              <select
                name="quantity"
                size="1"
                id="QuantitySelector"
                onChange={this.currentQuantityHandler}
              >
                {QuantEnumerator(targetProduct.UnitsInStock).map(opt => opt)}
              </select>
            </div>

            <div className="OptionComponent">
              <button type="button" onClick={this.addToCart}>
                Add Product
              </button>
            </div>

            <div className="OptionComponent">
              <table id="OrderRequestTable">
                <tr>{productProps.map(key => <th key>{key}</th>)}</tr>

                {Cart.map((prod, i) => (
                  <tr key={prod.id}>
                    <td>{i + 1}</td>
                    <td>{prod.ProductID}</td>
                    <td>{prod.ProductName}</td>
                    <td>
                      ${NumberWithCommas((prod.UnitRevenue / 100).toFixed(2))}
                    </td>
                    <td>{NumberWithCommas(prod.Quantity)}</td>
                    <td>
                      ${NumberWithCommas(
                        (prod.ProductRevenue / 100).toFixed(2)
                      )}
                    </td>
                    <td value={i}>
                      <button
                        type="button"
                        value={i}
                        onClick={this.removeFromCart}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
                {TableEnumerator(tableMinimumHeight - Cart.length).map(
                  td => td
                )}

                <tr>
                  <td colSpan="5">Freight Cost</td>
                  <td>${NumberWithCommas((Freight / 100).toFixed(2))}</td>
                  <td />
                </tr>

                <tr>
                  <td colSpan="5">Grand Total</td>
                  <td>${NumberWithCommas((TotalRevenue / 100).toFixed(2))}</td>
                  <td />
                </tr>
              </table>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.inventory.products,
  targetProduct: state.inventory.targetProduct,
  customers: state.orders.customers,
  orders: state.orders.orders
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: () => {
    dispatch(getAllProductsThunk('ProductID', 'ASC'))
  },
  onLoadCustomers: () => {
    dispatch(getAllCustomersThunk())
  },
  onLoadTargetProduct: id => {
    dispatch(getTargetProductThunk(id))
  },
  onLoadOrders: (sortBy, sortOrder) => {
    dispatch(getAllOrdersThunk(sortBy, sortOrder))
  },
  onCreateOrder: state => {
    dispatch(createNewOrderThunk(state))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderReceived)
