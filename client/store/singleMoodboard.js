import Axios from 'axios'
/**
 * ACTION TYPES
 */
const GET_A_MOODBOARD = 'GET_A_MOODBOARD'
const SAVE_A_MOODBOARD = 'SAVE_A_MOODBOARD'
/**
 * INITIAL STATE
 */
const initialState = {}
/**
 * ACTION CREATORS
 */
const getAMoodboard = moodboard => ({
  type: GET_A_MOODBOARD,
  moodboard
})

const savingMoodboard = moodboard => ({
  type: 'SAVE_A_MOODBOARD',
  moodboard
})

/**
 * THUNK CREATORS
 */
export const createAMoodboard = (userId, canvas) => async dispatch => {
  try {
    const {data} = await Axios.post(`/api/moodboards/create`, {
      userId,
      canvas,
      title: 'untitled',
      description: 'none',
      numOfHearts: 0
    })
    dispatch(getAMoodboard(data))
  } catch (error) {
    console.log(error)
  }
}

export const fetchAMoodboard = (userId, moodboardId) => async dispatch => {
  try {
    console.log('AXIOS: ', userId, moodboardId)
    const {data} = await Axios.get(`/api/moodboards/${userId}/${moodboardId}`)
    dispatch(getAMoodboard(data))
  } catch (error) {
    console.log(error)
  }
}

export const saveMoodboard = (
  userId,
  moodboardId,
  fabricCanvas,
  title,
  description
) => async dispatch => {
  try {
    const {data} = await Axios.put(
      `/api/moodboards/saveCanvas/:userId/:moodboardId`,
      {
        moodboardId,
        fabricCanvas,
        title,
        description
      }
    )
    dispatch(getAMoodboard(data))
  } catch (error) {
    console.log(error)
  }
}

const singleMoodboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_A_MOODBOARD:
      return action.moodboard
    default:
      return state
  }
}
export default singleMoodboardReducer
