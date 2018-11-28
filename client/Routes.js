import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Landing, Login, Signup, UserHome, About} from './components'
import {EmployeeList, EmployeeDeets} from './components/Employees'
import {TeamList, TeamDeets} from './components/Teams'

import {me, getEmployees, getTeams} from './store'


/* -----------------    COMPONENT     ------------------ */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* available to all visitors */}
        <Route exact path="/" component={Landing} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/about" component={About} />
        {isLoggedIn && (
          <Switch>
            {/* only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route exact path="/employees" component={EmployeeList} />
            <Route path="/employees/:id" component={EmployeeDeets} />
            <Route exact path="/teams" component={TeamList} />
            <Route path="/teams/:id" component={TeamDeets} />
          </Switch>
        )}
        {/* Displays the Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
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
    loadInitialData() {
      dispatch(me())
      dispatch(getEmployees())
      dispatch(getTeams())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/* -----------------    PROP TYPES     ------------------ */

Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
