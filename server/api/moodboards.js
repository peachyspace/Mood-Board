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
//GET api/moodboards/:userId/:moodboardId
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
    console.log(error)
  }
})

//PUT  /api/moodboards/saveCanvas/:userId/:moodboardId
router.put('/saveCanvas/:userId/:moodboardId', async (req, res, next) => {
  try {
    console.log('Before save canvas!!!!!!!!')
    const moodboard = await Moodboard.findOne({
      where: {
        userId: req.params.userId,
        id: req.params.moodboardId
      }
    })
    //console.log('moodboad: ', moodboard)
    //console.log('req.body: ', req.body)

    moodboard.update(req.body)
    await moodboard.save()
    console.log('moodboard updated!!!!!!!!!!!!')
    res.sendStatus(200).end()
  } catch (error) {
    next(error)
  }
})
//POST /api/moodboards/create/:userID

router.post('/create', async (req, res, next) => {
  try {
    const newMoodboard = await Moodboard.create(req.body)
    res.json(newMoodboard)
  } catch (error) {
    next(error)
  }
})
