import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getAllProductsThunk,
  getProductsByCategoryThunk,
  getAllCategoriesThunk
} from '../../store/inventory'

class AssetsDashboard extends Component {
  constructor() {
    super()
    this.state = {
      currentCategory: 'All Categories',
      currentSortBy: 'ProductID',
      currentSortOrder: 'ASC'
    }
  }

  async componentDidMount() {
    await this.props.onLoadCategories()
    await this.props.onLoadProducts(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCategory
    )
  }

  categoryHandler = async evt => {
    await this.setState({
      currentCategory: evt.target.value
    })
    this.props.onLoadProducts(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCategory
    )
  }

  sortbyHandler = async evt => {
    await this.setState({
      currentSortBy: evt.target.value
    })
    this.props.onLoadProducts(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCategory
    )
  }

  sortorderHandler = async evt => {
    await this.setState({
      currentSortOrder: evt.target.value
    })
    this.props.onLoadProducts(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCategory
    )
  }

  render() {
    let {categories, products} = this.props
    let productProps = [
      'ProductID',
      'ProductName',
      'Category',
      'QuantityPerUnit',
      'UnitPrice',
      'UnitsInStock',
      'Obselete'
    ]
    if (!products || !categories) {
      return <div> Loading ... </div>
    }
    return (
      <div className="Container">
        <div className="ReportingOptions">
          <div className="OptionComponent">
            <div>Category: </div>
            <select name="categories" size="1" onChange={this.categoryHandler}>
              <option value="All Categories">All Categories</option>
              {categories.map(cat => (
                <option key={cat.CategoryID} value={cat.CategoryID}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Sort By: </div>
            <select name="sortBy" size="1" onChange={this.sortbyHandler}>
              {productProps.map(prop => (
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
          <tr>{productProps.map(key => <th key>{key}</th>)}</tr>

          {products.map(prod => (
            <tr key={prod.ProductID}>
              <td>{prod.ProductID}</td>
              <td>{prod.ProductName}</td>
              <td>{categories[prod.CategoryID - 1].CategoryName}</td>
              <td>{prod.QuantityPerUnit}</td>
              <td>${(prod.UnitPrice / 100).toFixed(2)}</td>
              <td>{prod.UnitsInStock}</td>
              <td>{prod.Discontinued ? "Yes" : "No"}</td>
            </tr>
          ))}
        </table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  products: state.inventory.products,
  categories: state.inventory.categories
})

const mapDispatchToProps = dispatch => ({
  onLoadProducts: (sortBy, sortOrder, id) => {
    if (id === 'All Categories') {
      dispatch(getAllProductsThunk(sortBy, sortOrder))
    } else {
      dispatch(getProductsByCategoryThunk(sortBy, sortOrder, id))
    }
  },
  onLoadCategories: () => {
    dispatch(getAllCategoriesThunk())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(AssetsDashboard)
