import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
  getAllProductsThunk,
  getProductsByCategoryThunk,
  getAllCategoriesThunk
} from '../../store/inventory'
import {NumberWithCommas} from '../../../utilities'

class UpdateInventory extends Component {
  constructor() {
    super()
    this.state = {
      currentCategory: 'All Categories',
      currentSortBy: 'ProductID',
      currentSortOrder: 'ASC',
      initProducts: []
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

  setInitial = async () => {
    await this.setState({
      initProducts: this.props.products
    })
  }

  updateInventoryHandler = async () => {
    await this.props.onLoadProducts(
      this.state.currentSortBy,
      this.state.currentSortOrder,
      this.state.currentCategory
    )
  }

  render() {
    let {initProducts} = this.state
    console.log(initProducts)
    let {categories, products} = this.props
    let productProps = [
      'ProductID',
      'ProductName',
      'Category',
      'UnitPrice',
      'Previous Stock',
      'Delta',
      'New Stock',
      'Inventory ∆'
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
              <option value="All Categories" style={{color: 'black'}}>All Categories</option>
              {categories.map(cat => (
                <option
                  key={cat.CategoryID}
                  value={cat.CategoryID}
                  style={{color: 'black'}}>
                  {cat.CategoryName}
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Sort By: </div>
            <select name="sortBy" size="1" onChange={this.sortbyHandler}>
              {productProps.map(prop => (
                <option key value={prop} style={{color: 'black'}}>
                  {prop}
                </option>
              ))}
            </select>
          </div>

          <div className="OptionComponent">
            <div>Sort Order: </div>
            <select name="sortOrder" size="1" onChange={this.sortorderHandler}>
              <option value="ASC" style={{color: 'black'}}>Ascending</option>
              <option value="DESC" style={{color: 'black'}}>Descending</option>
            </select>
          </div>
        </div>

        <div className="ReportingOptions">
          <div className="OptionComponent">
            {initProducts.length === 0 ? (
              <div className="SubmitOrder Ready" onClick={this.setInitial}>
                Set Checkpoint
              </div>
            ) : (
              <div className="SubmitOrder">Checkpoint Set</div>
            )}
          </div>

          <div/>

          <div className="OptionComponent">
            {initProducts.length === 0 ? (
              <div className="SubmitOrder Disabled">Update Inventory</div>
            ) : (
              <div
                className="SubmitOrder"
                onClick={this.updateInventoryHandler}
              >
                Update Inventory
              </div>
            )}
          </div>
        </div>

        <div className="Instructions">
        <div id="InstHeading">Instructions:</div>
        <div/>
          <div>Set Checkpoint - It sets the current inventory as a base view</div>
          <div>Open the UpdateInventory.xlsx and input your inventory changes</div>
          <div>Run "npm run update" into the Node terminal </div>
          <div>Press "Update Inventory" </div>
        </div>

        <table>
          <tr>{productProps.map(key => <th key>{key}</th>)}</tr>

          {products.map(prod => (
            <tr key={prod.ProductID}>
              <td>{prod.ProductID}</td>
              <td>{prod.ProductName}</td>
              <td>{categories[prod.CategoryID - 1].CategoryName}</td>
              <td>${NumberWithCommas((prod.UnitPrice / 100).toFixed(2))}</td>
              <td>
                {initProducts[0]
                  ? initProducts.find(
                      initprod => initprod.ProductID === prod.ProductID
                    ).UnitsInStock
                  : null}
              </td>
              <td>
                {initProducts[0]
                  ? NumberWithCommas(prod.UnitsInStock -
                    initProducts.find(
                      initprod => initprod.ProductID === prod.ProductID
                    ).UnitsInStock)
                  : null}
              </td>
              <td>{prod.UnitsInStock}</td>
              <td>
                {initProducts[0]
                  ? `$${NumberWithCommas((
                      (prod.UnitsInStock -
                        initProducts.find(
                          initprod => initprod.ProductID === prod.ProductID
                        ).UnitsInStock) *
                      prod.UnitPrice /
                      100
                    ).toFixed(2))}`
                  : null}
              </td>
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

export default connect(mapStateToProps, mapDispatchToProps)(UpdateInventory)
