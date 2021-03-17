const Sequelize = require('sequelize')
const db = require('../db')

const Moodboard = db.define('moodboard', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  canvas: {
    type: Sequelize.TEXT
  },
  numberOfHearts: {
    type: Sequelize.INTEGER
  }
})
module.exports = Moodboard
