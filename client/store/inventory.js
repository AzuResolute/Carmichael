import axios from 'axios'
import {UpdateInventoryThroughExcel} from '../../utilities'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
const GET_TARGET_PRODUCT = 'GET_TARGET_PRODUCT'
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'
const UPDATE_PRODUCTS = 'UPDATE_PRODUCTS'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getProductsByCategory = products => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  products
})

const getTargetProduct = product => ({
  type: GET_TARGET_PRODUCT,
  product
})

const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
})

// const updateProduct => ({})

export const getAllProductsThunk = (sortBy, sortOrder) => async dispatch => {
  try {
    if (sortBy === 'Category') {
      sortBy = 'CategoryID'
    }
    const {data} = await axios.get(`/api/products/${sortBy}/${sortOrder}`)
    dispatch(getAllProducts(data))
  } catch (error) {
    console.error(error)
  }
}

export const getProductsByCategoryThunk = (
  sortBy,
  sortOrder,
  categoryID
) => async dispatch => {
  try {
    if (sortBy === 'Category') {
      sortBy = 'CategoryID'
    }
    const {data} = await axios.get(
      `/api/products/${sortBy}/${sortOrder}/${categoryID}`
    )
    dispatch(getProductsByCategory(data))
  } catch (error) {
    console.error(error)
  }
}

export const getTargetProductThunk = id => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/target/${id}`)
    dispatch(getTargetProduct(data))
  } catch (error) {
    console.error(error)
  }
}

export const getAllCategoriesThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products/categories')
    dispatch(getAllCategories(data))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {
  products: [],
  categories: [],
  targetProduct: {}
}

export default function(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_ALL_PRODUCTS:
    case GET_PRODUCTS_BY_CATEGORY:
      newState.products = action.products
      return newState
    case GET_TARGET_PRODUCT:
      newState.targetProduct = action.product
      return newState
    case GET_ALL_CATEGORIES:
      newState.categories = action.categories
      return newState
    default:
      return state
  }
}
