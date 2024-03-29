import axios from 'axios'
import history from '../history'
/**
 * ACTION TYPES
 */
const GET_A_MOODBOARD = 'GET_A_MOODBOARD'
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

/**
 * THUNK CREATORS
 */
export const createAMoodboard = (
  userId,
  title,
  description,
  canvas,
  format,
  height,
  width,
  backgroundColor
) => async dispatch => {
  try {
    const {data} = await axios.post(`/api/moodboards/create`, {
      userId,
      title,
      description,
      canvas,
      format,
      height,
      width,
      backgroundColor,
      numberOfHearts: 0
    })
    dispatch(getAMoodboard(data))
    history.push('/home')
    location.reload()
  } catch (error) {
    console.log(error)
  }
}

export const fetchAMoodboard = (userId, moodboardId) => async dispatch => {
  try {
    const {data} = await axios.get(`/api/moodboards/${userId}/${moodboardId}`)
    dispatch(getAMoodboard(data))
  } catch (error) {
    console.log(error)
  }
}

export const saveMoodboard = (
  userId,
  moodboardId,
  fabricCanvas,
  format,
  height,
  width,
  backgroundColor,
  title,
  description
) => async dispatch => {
  try {
    const {data} = await axios.put(
      `/api/moodboards/saveCanvas/${userId}/${moodboardId}`,
      {
        canvas: fabricCanvas,
        format,
        height,
        width,
        backgroundColor,
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
