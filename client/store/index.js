import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import canvas from './canvas'
import moodboards from './moodboard'
import singleMoodboard from './singleMoodboard'
import searchUnsplash from './searchUnsplash'
import unsplashPhoto from './unsplashPhoto'

const reducer = combineReducers({
  user,
  canvas,
  moodboards,
  singleMoodboard,
  searchUnsplash,
  unsplashPhoto
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './canvas'
export * from './moodboard'
export * from './singleMoodboard'
export * from './searchUnsplash'
export * from './unsplashPhoto'
