import Axios from 'axios'
/* 
* ACTION TYPES
*/
const GET_UNSPLASH_PHOTO = 'GET_UNSPLASH_PHOTO'
/* 
* INITIAL STATE
*/
const initialState = {}

/* 
* ACTION CREATORS
*/

const getUnsplashPhoto = unsplashPhoto => ({
  type: GET_UNSPLASH_PHOTO,
  unsplashPhoto
})

/* 
* THUNK CREATORS
*/
export const fetchUnsplashPhoto = photoId => async dispatch => {
  try {
    const {data} = await Axios.get(`api/unsplash/download/${photoId}`)
    dispatch(getUnsplashPhoto(data))
  } catch (error) {
    console.log(error)
  }
}
/* 
* REDUCER
*/
const unsplashPhotoReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_UNSPLASH_PHOTO:
      return action.unsplashPhoto
    default:
      return state
  }
}
export default unsplashPhotoReducer
