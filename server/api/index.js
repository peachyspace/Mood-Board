const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/moodboards', require('./moodboards'))
router.use('/unsplash', require('./unsplash'))
router.use('/pixabay', require('./pixabay'))
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
