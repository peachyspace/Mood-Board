const router = require('express').Router()
const Moodboard = require('../db/models/moodboard')
module.exports = router
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
