const Sequelize = require('sequelize')
const db = require('../db')

const Moodboard = db.define('moodboard', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  description: {
    type: Sequelize.TEXT
  },
  canvas: {
    type: Sequelize.STRING
  },
  numberOfHearts: {
    type: Sequelize.INTEGER
  },
  numberOfFollowers: {
    type: Sequelize.INTEGER
  }
})
module.exports = Moodboard
