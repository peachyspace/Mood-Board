import axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_A_USERS_MOODBOARDS = 'GET_A_USERS_MOODBOARDS'
const DELETE_A_USERS_MOODBOARD = 'DELETE_A_USERS_MOODBOARD'
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

const deleteUserMoodboard = moodboardId => ({
  type: DELETE_A_USERS_MOODBOARD,
  moodboardId
})

/**
 * THUNK CREATORS
 */
export const fetchUserMoodboards = userId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/moodboards/${userId}`)
    dispatch(getUserMoodboards(data))
  } catch (error) {
    console.log(error)
  }
}

export const deleteMoodboard = (userId, moodboardId) => async dispatch => {
  try {
    await axios.delete(`/api/moodboards/delete/${userId}/${moodboardId}`)

    dispatch(deleteUserMoodboard(moodboardId))
  } catch (error) {
    console.log(error)
  }
}

const moodboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_A_USERS_MOODBOARDS:
      return action.moodboards
    case DELETE_A_USERS_MOODBOARD:
      return state.filter(moodboard => moodboard.id !== action.moodboardId)
    default:
      return state
  }
}
export default moodboardReducer
