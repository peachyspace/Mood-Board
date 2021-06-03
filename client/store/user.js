import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

/**
 * INITIAL STATE
 */
const defaultUser = {}

/**
 * ACTION CREATORS
 */
const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
    console.log('in 1st try')
  } catch (authError) {
    //when error occurs, we dont use history and dispatch res.data
    return dispatch(getUser({error: authError}))
  }

  try {
    console.log('in 2nd try')
    console.log(res.data)
    dispatch(getUser(res.data))
    history.push('/home')
    location.reload()
  } catch (dispatchOrHistoryErr) {
    console.log(dispatchOrHistoryErr.res.data)
  }
}

export const signup = (
  firstName,
  lastName,
  username,
  email,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', {
      firstName,
      lastName,
      username,
      email,
      password
    })
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }
  try {
    dispatch(getUser(res.data))
    history.push('/home')
    location.reload()
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/auth/logout')
    dispatch(removeUser())
    //history.push('/login')
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
}

/* import axios from 'axios'
import history from '../history'


const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'

const defaultUser = {}


const getUser = user => ({type: GET_USER, user})
const removeUser = () => ({type: REMOVE_USER})

export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data || defaultUser))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  let res
  try {
    res = await axios.post(`/auth/login`, {email, password})
     console.log('gggggres.data: ',res.data)
  } catch (authError) {
    return dispatch(getUser({error: authError}))
  }

  try {
   
    dispatch(getUser(res.data))
   
   // history.push('/home') //added 5/25/21 delete if issues arise
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr)
  }
}

export const signup = (
  firstName,
  lastName,
  username,
  email,
  password
) => async dispatch => {
  let res
  try {
    res = await axios.post('/auth/signup', {
      firstName,
      lastName,
      username,
      email,
      password
    })
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
    await axios.post('/auth/logout')
    dispatch(removeUser())
    history.push('/login')
  } catch (err) {
    console.error(err)
  }
}


export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_USER:
      return action.user
    case REMOVE_USER:
      return defaultUser
    default:
      return state
  }
} */
