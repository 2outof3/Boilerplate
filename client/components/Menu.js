import React, { Component } from 'react'
import { stack as BurgerMenu } from 'react-burger-menu'
import { decorator as reduxBurgerMenu } from 'redux-burger-menu'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Menu extends Component {
  constructor(props){
    super(props)
  }

  render(){
    const { isLoggedIn, handleClick} = this.props
    return (
      <BurgerMenu right >
      {isLoggedIn ? (
        <nav className="bm-item-list">
          <div>
            {/* The burger menu will show these links after you log in */}
            <Link className="bm-item" to="/home">Home</Link>
            <Link className="bm-item" to="/employees">Employee Directory</Link>
            <Link className="bm-item" to="/teams">Departments & Teams</Link>
            <Link className="bm-item" to="/about">About</Link>
            <a className="bm-item" href="#" onClick={handleClick}>Logout</a>
          </div>
        </nav>
        ) : (
        <nav className="bm-item-list">
          <div>
            {/* The burger menu will show these links before you log in */}
            <Link className="bm-item" to="/login">Login</Link>
            <Link className="bm-item" to="/signup">Sign Up</Link>
            <Link className="bm-item" to="/about">About</Link>
          </div>
        </nav>
        )}
      </BurgerMenu>)
  }
}


/* -----------------    CONTAINER     ------------------ */

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

export default connect(mapState, mapDispatch)(reduxBurgerMenu(Menu))


// /* -----------------    PROP TYPES     ------------------ */

Menu.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
