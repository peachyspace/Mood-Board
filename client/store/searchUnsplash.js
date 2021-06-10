/* import fetch from 'node-fetch'
global.fetch= fetch
import Unsplash, {toJSON} from 'unsplash-js'

const ACCESS_KEY= process.env.UNSPLASH_ACCESS_KEY;
 */
import Axios from 'axios'
/* 
* ACTION TYPES
*/
const GET_UNSPLASH_SEARCH_RESULT = 'GET_UNSPLASH_SEARCH_RESULT'
/* 
* INITIAL STATE
*/
const initialState = []

/* 
* ACTION CREATORS
*/

const getUnsplashSearchResult = searchUnsplashResult => ({
  type: GET_UNSPLASH_SEARCH_RESULT,
  searchUnsplashResult
})

/* 
* THUNK CREATORS
*/
export const fetchSearchResult = searchTerm => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/unsplash/${searchTerm}`)
    dispatch(getUnsplashSearchResult(data))
  } catch (error) {
    console.log(error)
  }
}
/* 
* REDUCER
*/
const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNSPLASH_SEARCH_RESULT:
      return action.searchUnsplashResult
    default:
      return state
  }
}
export default searchResultReducer
