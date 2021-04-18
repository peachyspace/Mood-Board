const fetch = require('node-fetch')
global.fetch = fetch
//import Unsplash, {toJSON} from 'unsplash-js'
const router = require('express').Router()
const {createApi} = require('unsplash-js')
module.exports = router

const ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY

const unsplash = createApi({accessKey: ACCESS_KEY})
//GET /api/unsplash/:searchTerm
router.get('/:searchTerm', async (req, res, next) => {
  try {
    await unsplash.search
      .getPhotos({
        query: req.params.searchTerm,
        page: 1,
        perPage: 30
      })
      .then(result => {
        if (result.errors) {
          console.log('error occurred: ', result.errors[0])
        } else {
          // handle success here
          const photos = result.response

          console.log('Success')
          const {total, results} = photos
          // handle success here
          console.log(`received ${results.length} photos out of ${total}`)
          /* console.log('first photo: ', results[0]); */
          console.log('toal pages', photos.total_pages)
          /* results.map(oneResult=> console.log(oneResult.urls.regular)) */
          res.json(results)
        }
      })
  } catch (error) {
    next(error)
  }
})

//GET /api/unsplash/download/:photoId
router.get('/download/:photoId', async (req, res, next) => {
  try {
    await unsplash.photos.get({photoId: req.params.photoId}).then(result => {
      if (result.errors) {
        console.log('error occurred: ', result.errors[0])
      } else {
        // handle success here
        const photo = result.response
        console.log(photo)
        //trigger a download event
        unsplash.photos.trackDownload({
          downloadLocation: photo.links.download_location
        })
        res.json(photo)
      }
    })
  } catch (error) {
    next(error)
  }
})
