import axios from 'axios'
import history from '../history'
import {OrderRequestToExcel} from '../../utilities'

const GET_ALL_ORDERS = 'GET_ALL_ORDERS'
const GET_ORDERS_BY_CUSTOMERS = 'GET_ORDERS_BY_CUSTOMERS'
const GET_ALL_CUSTOMERS = 'GET_ALL_CUSTOMERS'

const getAllOrders = orders => ({
  type: GET_ALL_ORDERS,
  orders
})

const getOrdersByCustomers = orders => ({
  type: GET_ORDERS_BY_CUSTOMERS,
  orders
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
    OrderRequestToExcel(state)
    await axios.post('/api/orders/OrderRequest', state)
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
  }
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_ALL_ORDERS:
    case GET_ORDERS_BY_CUSTOMERS:
      newState.orders = action.orders
      return newState
    case GET_ALL_CUSTOMERS:
      newState.customers = action.customers
      return newState
    default:
      return state
  }
}
