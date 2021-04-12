/* import fetch from 'node-fetch'
global.fetch= fetch
import Unsplash, {toJSON} from 'unsplash-js'

const ACCESS_KEY= process.env.UNSPLASH_ACCESS_KEY;
 */
import Axios from 'axios'
/* 
* ACTION TYPES
*/
const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT'
/* 
* INITIAL STATE
*/
const initialState = []

/* 
* ACTION CREATORS
*/

const getSearchResult = searchResult => ({
  type: GET_SEARCH_RESULT,
  searchResult
})

/* 
* THUNK CREATORS
*/
export const fetchSearchResult = searchTerm => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/unsplash/${searchTerm}`)
    dispatch(getSearchResult(data))
  } catch (error) {
    console.log(error)
  }
}
/* 
* REDUCER
*/
const searchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SEARCH_RESULT:
      return action.searchResult
    default:
      return state
  }
}
export default searchResultReducer
