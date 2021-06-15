const router = require('express').Router()
const Moodboard = require('../db/models/moodboard')
module.exports = router

//GET /api/moodboards/:userId
router.get('/:userId', async (req, res, next) => {
  try {
    const usersMoodboards = await Moodboard.findAll({
      where: {
        userId: req.params.userId
      }
    })
    res.json(usersMoodboards)
  } catch (error) {
    next(error)
  }
})
//GET /api/moodboards/:userId/:moodboardId
router.get('/:userId/:moodboardId', async (req, res, next) => {
  try {
    const singleMoodboard = await Moodboard.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.moodboardId
      }
    })
    res.json(singleMoodboard)
  } catch (error) {
    next(error)
  }
})

//PUT  /api/moodboards/saveCanvas/:userId/:moodboardId
router.put('/saveCanvas/:userId/:moodboardId', async (req, res, next) => {
  try {
    const moodboard = await Moodboard.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.moodboardId
      }
    })

    moodboard.update(req.body)
    let updatedMoodboard = await moodboard.save()
    res.json(updatedMoodboard)
  } catch (error) {
    next(error)
  }
})

//POST /api/moodboards/create
router.post('/create', async (req, res, next) => {
  try {
    const newMoodboard = await Moodboard.create(req.body)
    res.json(newMoodboard)
  } catch (error) {
    next(error)
  }
})

//DELETE  /api/moodboards/delete/:userId/:moodboardId
router.delete('/delete/:userId/:moodboardId', async (req, res, next) => {
  try {
    await Moodboard.destroy({
      where: {
        id: req.params.moodboardId,
        userId: req.params.userId
      }
    })
    res.sendStatus(204).end()
  } catch (error) {
    next(error)
  }
})
