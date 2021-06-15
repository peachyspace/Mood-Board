const router = require('express').Router()
const axios = require('axios')
const API_KEY = process.env.PIXABAY_API_KEY
module.exports = router

//GET /api/pixabay/:searchTerm
router.get('/:searchTerm', async (req, res, next) => {
  try {
    await axios
      .get(
        `https://pixabay.com/api/?key=${API_KEY}&q=${
          req.params.searchTerm
        }&image_type=photo&per_page=80&safesearch=true`
      )
      .then(response => {
        res.json(response.data.hits)
      })
  } catch (error) {
    next(error)
  }
})
