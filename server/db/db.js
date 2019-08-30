const Sequelize = require('sequelize')
const pkg = require('../../package.json')

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

// Use this for local windows. Change the username and pw to your postgres admin:
const db = new Sequelize(
  process.env.DATABASE_URL || `${databaseName}`,
  'postgres',
  'qwertyuiop',
  {
    logging: false,
    dialect: 'postgres'
  }
)

// Use this for local mac or Heroku:
// const db = new Sequelize(
//   process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`,
//   {
//     logging: false
//   }
// )

module.exports = db

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}