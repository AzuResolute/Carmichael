import axios from 'axios'
import history from '../history'
import {OrderRequestToExcel} from '../../utilities'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDERS_BY_CUSTOMERS = 'GET_ORDERS_BY_CUSTOMERS'
const GET_PRODUCTS_FROM_ORDERS_BY_CUSTOMER = 'GET_PRODUCTS_FROM_ORDERS_BY_CUSTOMER'
const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS'

const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

const getOrdersByCustomers = orders => ({
  type: GET_ORDERS_BY_CUSTOMERS,
  orders
})

const getProductsFromOrdersByCustomer = (orders, productsFromOrders) => ({
  type: GET_PRODUCTS_FROM_ORDERS_BY_CUSTOMER,
  orders, productsFromOrders
})

const getAllCustomers = customers => ({
  type: GET_ALL_CUSTOMERS,
  customers
})

export const getAllOrdersThunk = (sortBy, sortOrder) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/${sortBy}/${sortOrder}`)
    dispatch(getAllOrders(data))
  } catch (error) {
    console.error(error)
  }
}

export const getOrdersByCustomersThunk = (
  sortBy,
  sortOrder,
  customerID
) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/orders/${sortBy}/${sortOrder}/${customerID}`
    )
    dispatch(getOrdersByCustomers(data))
  } catch (error) {
    console.error(error)
  }
}

export const getProductsFromOrdersByCustomerThunk = (
  sortBy,
  sortOrder,
  customerID
) => async dispatch => {
  try {
    const {data} = await axios.get(
      `/api/orders/incProducts/${sortBy}/${sortOrder}/${customerID}`
    )
    let products = []
    data.forEach(element => {
      element.products.forEach(elemProd => {
        products.push(elemProd)
      })
    });
    dispatch(getProductsFromOrdersByCustomer(data, products))
  } catch (error) {
    console.error(error)
  }
}

export const getAllCustomersThunk = () => async dispatch => {
  try {
    const {data} = await axios.get(`/api/orders/customers`)
    dispatch(getAllCustomers(data))
  } catch (error) {
    console.error(error)
  }
}

export const createNewOrderThunk = state => async () => {
  try {
    let {Cart} = state
    OrderRequestToExcel(state)
    await axios.post('/api/orders/OrderRequest', state)
    for(let i = 0; i < Cart.length; i++) {
      await axios.put(`/api/products/OrderRequest`, Cart[i])
    }
    history.push('/reporting/orders')
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  orders: [],
  customers: [],
  targetOrder: {
    products: []
  },
  productsFromOrders: []
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_ALL_ORDERS:
    case GET_ORDERS_BY_CUSTOMERS:
      newState.orders = action.orders
      return newState
    case GET_PRODUCTS_FROM_ORDERS_BY_CUSTOMER:
      newState.orders = action.orders
      newState.productsFromOrders = []
      newState.productsFromOrders = action.productsFromOrders
      return newState
    case GET_ALL_CUSTOMERS:
      newState.customers = action.customers
      return newState
    default:
      return state
  }
}
