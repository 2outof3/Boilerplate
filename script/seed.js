'use strict'
const db = require('../server/db')
const chalk = require('chalk')
const { User, Employee, Team } = require('../server/db/models')
const { users, employees, teams } = require('./seeds')


async function seed() {
  await db.sync({ force: true })
  let seededUsers = users.map( user => User.create(user))
  let seededTeams = teams.map( team => Team.create(team))

  // since I had to use two separate API's for employee profiles and pics, I just merged them here right before passing them into Employee.create()
  employees.forEach(( employee, indx) => {
    if (employee.gender === 'Female'){
      employee.photoL = `https://randomuser.me/api/portraits/women/${indx}.jpg`
      employee.photoM = `https://randomuser.me/api/portraits/med/women/${indx}.jpg`
      employee.photoT = `https://randomuser.me/api/portraits/thumb/women/${indx}.jpg`
    }
    if (employee.gender === 'Male'){
      employee.photoL = `https://randomuser.me/api/portraits/men/${indx}.jpg`
      employee.photoM = `https://randomuser.me/api/portraits/med/men/${indx}.jpg`
      employee.photoT = `https://randomuser.me/api/portraits/thumb/men/${indx}.jpg`
    }
    if (employee.gender === 'Non-Binary'){
      employee.photoL = `https://randomuser.me/api/portraits/women/${indx}.jpg`
      employee.photoM = `https://randomuser.me/api/portraits/med/women/${indx}.jpg`
      employee.photoT = `https://randomuser.me/api/portraits/thumb/women/${indx}.jpg`
    }
    if (employee.gender === 'N/A'){
      employee.photoL = `https://randomuser.me/api/portraits/men/${indx}.jpg`
      employee.photoM = `https://randomuser.me/api/portraits/med/men/${indx}.jpg`
      employee.photoT = `https://randomuser.me/api/portraits/thumb/men/${indx}.jpg`
    }
  })

  let seededEmployees = employees.map((employee) => Employee.create(employee))


  await Promise.all(seededUsers)
  await Promise.all(seededTeams)
  await Promise.all(seededEmployees)

  console.log(chalk.keyword('orange')(`${seededUsers.length} users seeded succesfully`))
  console.log(chalk.keyword('yellow')(`${seededEmployees.length} employees seeded succesfully`))
  console.log(chalk.keyword('green')(`${seededTeams.length} teams seeded succesfully`))
  console.log(chalk.keyword('blue')`seeding complete!`)
}

async function runSeed() {
  console.log(chalk.red('🌱  Seeding...'))
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log(chalk.keyword('indigo')('closing db connection'))
		await db.close()
		console.log(chalk.keyword('violet')('db connection closed'))
	}
}

if (module === require.main) {
	runSeed()
}

// exported for testing purposes
module.exports = seed
