import Axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_A_USERS_MOODBOARDS = 'GET_A_USERS_MOODBOARDS'
/**
 * INITIAL STATE
 */
const initialState = []
/**
 * ACTION CREATORS
 */
const getUserMoodboards = moodboards => ({
  type: GET_A_USERS_MOODBOARDS,
  moodboards
})

/**
 * THUNK CREATORS
 */
export const fetchUserMoodboards = userId => async dispatch => {
  try {
    const {data} = await Axios.get(`/api/moodboards/${userId}`)
    dispatch(getUserMoodboards(data))
  } catch (error) {
    console.log(error)
  }
}

const moodboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_A_USERS_MOODBOARDS:
      return action.moodboards
    default:
      return state
  }
}
export default moodboardReducer
