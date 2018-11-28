const Sequelize = require('sequelize')
const db = require('../db')

const Team = db.define('team', {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    spiritAnimal: {
        type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT,
    },
  }, {
    scopes: {
      populated: () => ({
        include: [{
          model: db.model('employee')
        }]
      })
    }
  })
  module.exports = Team
