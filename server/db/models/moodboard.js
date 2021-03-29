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
  format: {
    type: Sequelize.STRING
  },
  height: {
    type: Sequelize.INTEGER
  },
  width: {
    type: Sequelize.INTEGER
  },
  backgroundColor: {
    type: Sequelize.STRING
  },
  numberOfHearts: {
    type: Sequelize.INTEGER
  }
})
module.exports = Moodboard
