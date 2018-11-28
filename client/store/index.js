import {createStore, combineReducers, applyMiddleware} from 'redux'
import {reducer as burgerMenu} from 'redux-burger-menu'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import auth from './auth'
import employees from './employees'
import teams from './teams'


const reducer = combineReducers({user, auth, employees, teams, burgerMenu})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './teams'
export * from './employees'
