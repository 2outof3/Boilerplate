import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth} from '../store'

/* -----------------    COMPONENT     ------------------ */

const AuthForm = props => {
  const {name, displayForm, handleSubmit, error} = props

  return (
    <div className="auth-form">
    <form className="auth-form-form" onSubmit={handleSubmit} name={name}>
      {error && error.response && <div>{error.response.data}</div>}
          <input name="username" placeholder="Username" type="text" />
          <input name="password" placeholder="Password" type="password" />
          <button type="submit">{`${displayForm.split('').join(' ')}`}</button>
        <a href="/auth/google">
        <button className="button-google">With Google<img className="google-icon" src="https://www.google.es/images/branding/googleg/1x/googleg_standard_color_128dp.png" /></button>
        </a>
    </form>
    </div>
  )
}

/* -----------------    CONTAINER     ------------------ */

const mapLogin = state => {
  return {
    name: 'login',
    displayForm: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayForm: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const username = evt.target.username.value
      const password = evt.target.password.value
      dispatch(auth(username, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/* -----------------    PROP TYPES     ------------------ */

AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayForm: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
