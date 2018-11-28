import React, { Component } from 'react'
import { connect } from 'react-redux'
import  EmployeeLI  from './EmployeeLI'
import { makeEmployee } from '../../store'

/* -----------------    COMPONENT     ------------------ */
class EmployeeList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			firstName: '',
			lastName: '',
			nameSearch: ''
		}
		this.renderNameSearch = this.renderNameSearch.bind(this)
		this.onSubmit = this.onSubmit.bind(this)
		this.filterName = this.filterName.bind(this)
		this.renderNewEmployeeWidget = this.renderNewEmployeeWidget.bind(this)
	}

	render() {
		const { employees, user } = this.props
		const authorizedToSearch = !!user.employeeId
		const userInfo = employees.length ? employees.filter(emp => emp.id === user.employeeId)[0] : {}
		return (
			<div className="container">
				<div className="employee-search">
					{ authorizedToSearch && this.renderNameSearch() }
					{ userInfo.isCEO && this.renderNewEmployeeWidget() }
				</div>
				<br />
				<br />
				<div className="employee-list">
					{employees.filter(this.filterName)
						.sort((a, b) => {
							if (a.lastName < b.lastName) return -1
							if (a.lastName > b.lastName) return 1
							return 0
						})
						.map(employee => {
							return <EmployeeLI employee={employee} key={employee.id} />
						})}
				</div>
			</div>
		)
	}

	renderNameSearch() {
		return (
			<div className="list-group-item min-content employee-item">
				<div className="media">
					<div className="media-left media-middle icon-container">
						<span className="glyphicon glyphicon-search" />
					</div>
					<div className="media-body">
						<h4 className="media-heading tucked">
							<input
							type="text" placeholder="Employee Search"
							className="form-like"
							onChange={evt => this.setState({ nameSearch: evt.target.value })}
							/>
						</h4>
					</div>
				</div>
			</div>
		)
	}

	renderNewEmployeeWidget() {
		return (
		<div className="list-group-item min-content employee-item">
			<form onSubmit={this.onSubmit} className="media" >
				<div className="media-left media-middle icon-container">
					<button type="submit"><span>➕</span></button>
				</div>
				<div className="media-body">
					<h4 className="media-heading tucked">
						<input name="firstName" type="text" placeholder="First Name" />
					</h4>
					<h4 className="media-heading tucked">
						<input name="lastName" type="text" placeholder="Last Name" />
					</h4>
				</div>
			</form>
		</div>
		)
	  }

	onSubmit(event) {
		event.preventDefault()
		const { makeEmployee } = this.props
		const { firstName, lastName } = event.target
		const newEmployee = {
			firstName: firstName.value,
			lastName: lastName.value
		}
		makeEmployee(newEmployee)
		if (firstName) {
			event.target.firstName.value = ''
			event.target.lastName.value = ''
		}
	}

	filterName(employee) {
		const searchMatch = new RegExp(this.state.nameSearch, 'i')
		return searchMatch.test(employee.firstName) || searchMatch.test(employee.lastName)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ employees, user }) => ({ employees, user})

const mapDispatch = { makeEmployee }


export default connect(mapState, mapDispatch)(EmployeeList)
