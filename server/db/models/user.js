const Sequelize = require('sequelize')
const Employee = require('./Employee')
const crypto = require('crypto')
const Team = require('./Team')
const db = require('../db')

const User = db.define(
	'user',
	{
		email: {
			type: Sequelize.STRING
		},
		username: {
			type: Sequelize.STRING,
			unique: true,
			allowNull: false
		},
		password: {
			type: Sequelize.STRING,
			allowNull: false,
			defaultValue: '123',
			get() {
				return () => this.getDataValue('password') //making it a func to hide it when it becomes serialized to JSON
			}
		},
		salt: {
			type: Sequelize.STRING,
			get() {
				return () => this.getDataValue('salt') //making it a func to hide it when it becomes serialized to JSON
			}
		},
		googleId: {
			type: Sequelize.STRING
		}
	},
	{
		scopes: {
			populated: () => ({
				include: [{ model: db.model('employee'), as: 'employee' }]
			})
		}
	}
)

module.exports = User

/* -----------------    INSTANCE METHODS     ------------------ */

User.prototype.correctPassword = function(potentialPassword) {
	return User.encryptPassword(potentialPassword, this.salt()) === this.password()
}

/* -----------------    CLASS METHODS     ------------------ */

User.generateSalt = () => crypto.randomBytes(16).toString('base64')

User.encryptPassword = (plainText, salt) => {
	return crypto
		.createHash('RSA-SHA256')
		.update(plainText)
		.update(salt)
		.digest('hex')
}

User.findEmployeeByUserId = (id) => {
	return Employee.findOne({
		where: { userProfileId: id }
	})
}

/* -----------------    HOOKS     ------------------ */

const setSaltAndPassword = (user) => {
	if (user.changed('password')) {
		user.salt = User.generateSalt()
		user.password = User.encryptPassword(user.password(), user.salt())
	}
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
