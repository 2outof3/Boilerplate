const Sequelize = require('sequelize')
const db = require('../db')

const Employee = db.define(
	'employee',
	{
		firstName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: { notEmpty: true }
		},
		lastName: {
			type: Sequelize.STRING,
			allowNull: false,
			validate: { notEmpty: true }
		},
		photoL: {
			type: Sequelize.STRING,
			defaultValue: '/images/placeholder_image.jpg'
		},
		photoM: {
			type: Sequelize.STRING,
			defaultValue: '/images/placeholder_image.jpg'
		},
		photoT: {
			type: Sequelize.STRING,
			defaultValue: '/images/placeholder_image.jpg'
		},
		favColor: {
			type: Sequelize.STRING
		},
		gender: {
			type: Sequelize.ENUM('Male', 'Female', 'Non-Binary', 'N/A')
		},
		phoneNumber: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.VIRTUAL,
			get() {
				const fNameStr = this.getDataValue('firstName').split(' ').join('')
				.toLowerCase()
				const lNameStr = this.getDataValue('lastName').split(' ').join('')
				.toLowerCase()
				const email = `${fNameStr}.${lNameStr}@postlight.com`
			 return email
			}
		  },
		isLeader: {
			type: Sequelize.BOOLEAN,
			defaultValue: 'false'
		},
		jobTitle: {
			type: Sequelize.STRING,
			defaultValue: 'Ninja'
		},
		isCEO: {
			type: Sequelize.BOOLEAN,
			defaultValue: false
		}
	}
)

module.exports = Employee
