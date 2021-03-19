import Axios from 'axios'

const SAVE_CANVAS = 'SAVE_CANVAS'

const savingCanvas = fabricCanvas => ({
  type: SAVE_CANVAS,
  fabricCanvas
})

export const canvasSaver = (
  userId,
  moodboardId,
  fabricCanvas
) => async dispatch => {
  let res
  try {
    res = await Axios.put(
      `/api/moodboards/saveCanvas/${userId}/${moodboardId}`,
      {canvas: fabricCanvas}
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
