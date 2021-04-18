const fetch = require('node-fetch')
global.fetch = fetch
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
          const {results} = photos
          // handle success here
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
