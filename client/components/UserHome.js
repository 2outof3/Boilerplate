import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/* -----------------    COMPONENT     ------------------ */

export const UserHome = props => {
  const {username} = props

  return (
    <div>
      <h2 className="welcomeMessage">Welcome, {username}. This is your user home page.</h2>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapState = state => {
  return {
    username: state.user.username
  }
}

export default connect(mapState)(UserHome)

/* -----------------    PROP TYPES     ------------------ */

UserHome.propTypes = {
  username: PropTypes.string
}
