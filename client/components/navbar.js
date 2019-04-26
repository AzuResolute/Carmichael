import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div>
    <h1>Carmichael Inventory Management and Reporting System</h1>
    <nav>
      {isLoggedIn ? (
        <div>
          <Link to="/home">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        // <div>
        //   {/* The navbar will show these links before you log in */}
        //   <Link to="/login">Login</Link>
        //   <Link to="/signup">Sign Up</Link>
        // </div>
        <div>

          <Link to="/home">
            <img src="/images/logo.png" alt="Carmichael Logo"/>
          </Link>
          <div>
            <div className = "NavSegment">Dashboard: </div>
            <Link to="/">Overview (P)</Link>
            <Link to="/">Inventory (P)</Link>
            <Link to="/">Customer (P)</Link>
            <Link to="/">Supplier (P)</Link>
          </div>

          <div>
            <div className = "NavSegment">Reporting: </div>
            <Link to="/reporting/inventory">Inventory</Link>
            <Link to="/">Orders (P)</Link>
            <Link to="/">Accounts (P)</Link>
          </div>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
