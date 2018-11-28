const Employee = require('./Employee')
const Team = require('./Team')
const User = require('./User')

/* -----------------    Associations     ------------------ */

Employee.belongsTo(Team, {
	constraints: false //just to be able to seed everything in one go
})
Team.hasMany(Employee, {
	constraints: false
})

Employee.hasOne(User, {
	foreignKey: 'employeeId',
	onDelete: 'cascade', // will delete the user profile of a deleted employee
	hooks: true
})
User.belongsTo(Employee, { as: 'employee' })

module.exports = {
	Employee,
	Team,
	User
}
