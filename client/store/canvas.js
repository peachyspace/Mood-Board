import Axios from 'axios'

const SAVE_CANVAS = 'SAVE_CANVAS'

const savingCanvas = fabricCanvas => ({
  type: SAVE_CANVAS,
  fabricCanvas
})

export const canvasSaver = (
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
  let res
  try {
    console.log('canvas:', fabricCanvas)
    console.log('Color: ', backgroundColor)
    console.log('format: ', format)
    console.log('height: ', height)
    res = await Axios.put(
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
    dispatch(savingCanvas(fabricCanvas))
  } catch (error) {
    console.error(error)
  }
}

const initialState = {}

export default function canvasReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CANVAS:
      return action.fabricCanvas
    default:
      return state
  }
}
