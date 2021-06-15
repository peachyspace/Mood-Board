import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import moodboards from './moodboard'
import singleMoodboard from './singleMoodboard'
import pixabaySearch from './pixabaySearch'
const reducer = combineReducers({
  user,
  moodboards,
  singleMoodboard,
  pixabaySearch
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './moodboard'
export * from './singleMoodboard'
export * from './pixabaySearch'
