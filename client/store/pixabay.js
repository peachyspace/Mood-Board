import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_SEARCH_RESULT = 'GET_SEARCH_RESULT'
/**
 * INITIAL STATE
 */
const initialState = []
/**
 * ACTION CREATORS
 */
const getSearchResult = searchResult => ({
  type: GET_SEARCH_RESULT,
  searchResult
})
/**
 * THUNK CREATORS
 */
