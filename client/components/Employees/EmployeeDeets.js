import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import NotFound from '../NotFound'
import ContentEditable from 'react-contenteditable'
import { updateEmployee } from '../../store'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */

class EmployeeDeets extends Component {
	constructor(props) {
		super(props)
		this.state = {
			employee: props.employee
		}

		this.onEmployeeUpdate = this.onEmployeeUpdate.bind(this)
		this.renderPronouns = this.renderPronouns.bind(this)

	}

	componentWillReceiveProps(newProps, oldProps) {
		if (newProps.employees !== oldProps.employees) {
			this.setState({
				employee: newProps.employees.filter(employee => employee.id === Number(this.props.match.params.id))[0]
			})
		}
	}

	render() {
		const employee = this.state.employee
		if (!employee) return <NotFound /> // the employee id is invalid
		const {user, teams, employees} = this.props

		const userInfo = employees.filter(emp => emp.id === user.employeeId)[0]
		const bigBoss = userInfo.isCEO
		const teamLeader = userInfo.isLeader && employee.teamId === userInfo.teamId
		const authorized = user.employeeId === employee.id || bigBoss || teamLeader
		return (
			<div>
				<h1>{`${employee.firstName}'s Employee Profile`}</h1>
				<img src={employee.photoL} alt={`Fun fact: ${employee.firstName}'s favourite color is ${employee.favColor}`} />
				<li>
					<ContentEditable
						disabled={!authorized}
						value={employee.firstName}
						html={employee.firstName}
						onChange={evt => this.onEmployeeUpdate({ firstName: evt.target.value })}
						contentEditable={!!authorized}
					/>
				</li>
				<li>
					<ContentEditable
						disabled={!authorized}
						value={employee.lastName}
						html={employee.lastName}
						onChange={evt => this.onEmployeeUpdate({ lastName: evt.target.value })}
						contentEditable={!!authorized}
					/>
				</li>
				<li>
					<ContentEditable
						disabled={!authorized}
						value={employee.jobTitle}
						html={employee.jobTitle}
						onChange={evt => this.onEmployeeUpdate({ jobTitle: evt.target.value })}
						contentEditable={!!authorized}
					/>
				</li>
				<li>
					<ContentEditable
						disabled={!authorized}
						value={employee.phoneNumber}
						html={employee.phoneNumber}
						onChange={evt => this.onEmployeeUpdate({ phoneNumber: evt.target.value })}
						contentEditable={!!authorized}
					/>
				</li>
				<li>
					<ContentEditable
						disabled={!authorized}
						value={employee.email}
						html={employee.email}
						onChange={evt => this.onEmployeeUpdate({ email: evt.target.value })}
						contentEditable={!!authorized}
					/>
				</li>
				<li>
					{this.renderPronouns(employee.gender)}
				</li>

			</div>
		)
	}

	renderPronouns(gender) {
		if ( gender === 'N/A' ) return <div />
		if ( gender === 'Male' ){
			return (
				<div>
					<div>Pronouns: He/Him</div>
				</div>
			)}
		if ( gender === 'Female' ){
			return (
				<div>
					<div>Pronouns: She/Her</div>
				</div>
			)}
		if ( gender === 'Non-BinaryB' ){
			return (
				<div>
					<div>Pronouns: They/Them</div>
				</div>
			)}
	}

	onEmployeeUpdate(employeeUpdateObj) {
		const { debouncedUpdateEmployee } = this.props
		const { employee } = this.state
		this.setState({
			employee: Object.assign(employee, employeeUpdateObj)
		})
		debouncedUpdateEmployee(Number(this.props.match.params.id), employeeUpdateObj)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({employees, teams, user }, ownProps) => {
	const paramId = Number(ownProps.match.params.id)
	const employee = employees.find((employee) => employee.id === paramId)
	return { employee, teams, user, employees}
}

const mapDispatch = (dispatch, ownProps) => ({
	debouncedUpdateEmployee: _.debounce((...args) => {
		dispatch(updateEmployee(...args))
	}, 500)
})

export default connect(mapState, mapDispatch)(EmployeeDeets)
