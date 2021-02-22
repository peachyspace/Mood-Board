const SAVE_CANVAS = 'SAVE_CANVAS'

const savingCanvas = fabricCanvas => ({
  type: SAVE_CANVAS,
  fabricCanvas
})

export const canvasSaverThunk = fabricCanvas => dispatch => {
  dispatch(savingCanvas(fabricCanvas))
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
