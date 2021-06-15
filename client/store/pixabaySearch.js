import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_PIXABAY_SEARCH_RESULT = 'GET_PIXABAY_SEARCH_RESULT'
/**
 * INITIAL STATE
 */
const initialState = []
/**
 * ACTION CREATORS
 */
const getPixabaySearchResult = searchResult => ({
  type: GET_PIXABAY_SEARCH_RESULT,
  searchResult
})
/**
 * THUNK CREATORS
 */
export const fetchPixabaySearchResult = searchTerm => async dispatch => {
  try {
    const {data} = await axios.get(`/api/pixabay/${searchTerm}`)
    dispatch(getPixabaySearchResult(data))
  } catch (error) {
    console.log(error)
  }
}

/* 
* REDUCER
*/
const pixabaySearchResultReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PIXABAY_SEARCH_RESULT:
      return action.searchResult
    default:
      return state
  }
}
export default pixabaySearchResultReducer
