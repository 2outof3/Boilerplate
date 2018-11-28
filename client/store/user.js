import axios from 'axios'
import history from '../history'

/* -----------------    ACTION TYPES     ------------------ */   //May seem redundant, but this way we NEVER have a typo action type string
const GET = 'GET_USER'
export const DELETE = 'DELETE_USER'

/* -----------------    INITIAL STATE     ------------------ */
const defaultUser = {}

/* -----------------    ACTION CREATORS     ------------------ */
const getUser = user => ({type: GET, user})
const removeUser = () => ({type: DELETE})

/* -----------------    REDUCER     ------------------ */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET:
      return action.user
    case DELETE:
      return defaultUser
    default:
      return state
  }
}

/* -----------------    THUNK CREATORS     ------------------ */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/local/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const auth = (username, password, method) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/local/${method}`, {username, password})
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
    dispatch(getUser(res.data))
    history.push('/home')
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/local/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}
