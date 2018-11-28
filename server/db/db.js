const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
  {
    operatorsAliases: false, //turns off the repetitive sequelize warning about symbols
    logging: false
  }
)
module.exports = db

/* ----------------- global Mocha hook ------------------ */
if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
