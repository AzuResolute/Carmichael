import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_PRODUCTS_BY_CATEGORY = 'GET_PRODUCTS_BY_CATEGORY'
const GET_ALL_CATEGORIES = 'GET_ALL_CATEGORIES'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getProductsByCategory = products => ({
  type: GET_PRODUCTS_BY_CATEGORY,
  products
})

const getAllCategories = categories => ({
  type: GET_ALL_CATEGORIES,
  categories
})

export const getAllProductsThunk = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/products')
    dispatch(getAllProducts(data))
  } catch (error) {
      console.error(error)
  }
}

export const getProductsByCategoryThunk = categoryID => async dispatch => {
  try {
    const {data} = await axios.get(`/api/products/${categoryID}`)
    dispatch(getProductsByCategory(data))
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
  categories: []
}

export default function (state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case GET_ALL_PRODUCTS:
    case GET_PRODUCTS_BY_CATEGORY:
      newState.products = action.products
      break
    case GET_ALL_CATEGORIES:
      newState.categories = action.categories
      break
    default:
      return state
  }
}
