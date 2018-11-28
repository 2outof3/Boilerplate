import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteEmployee } from '../../store'

/* -----------------    COMPONENT     ------------------ */
class EmployeeLI extends Component {
	render() {
		const { employee, user, employees, deleteEmployee} = this.props
		const authorizedView = !!user.employeeId
		const userInfo = authorizedView ? employees.filter(emp => emp.id === user.employeeId)[0] : null
		const bigBoss = authorizedView && userInfo.isCEO
		const teamLeader = authorizedView && userInfo.isLeader && employee.teamId === userInfo.teamId
		const authorizedDeletion = user.employeeId === employee.id || bigBoss || teamLeader
		return (
			<div className="list-group-item min-content employee-item">
				<div className="media">
					<div className="media-left media-middle icon-container">
						<img src={employee.photoT} alt={`${employee.firstName[0]}. ${employee.lastName}`} />
					</div>
					{authorizedView ?
						<Link
						className="media=body"
						activeClassName="active"
						to={`/employees/${employee.id}`}>
							<h4 className="media-heading tucked">
								<span placeholder="Jean Doe">{`${employee.lastName}, ${employee.firstName}`}</span>
							</h4>
							<h5 className="tucked">
								<span>{employee.email}</span>
							</h5>
						</Link>
						:
						<div className="media=body">
							<h4 className="media-heading tucked">{`${employee.firstName[0]}. ${employee.lastName}`}
							</h4>
							<h5 className="tucked">
								<span>{employee.email}</span>
							</h5>
						</div>
					}
					{authorizedDeletion &&
						<div className="media-right media-middle">
							<button className="btn btn-default" onClick={ () => deleteEmployee(employee.id) }>
								<span className="glyphicon glyphicon-remove">❌</span>
							</button>
						</div>
					}
				</div>
			</div>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ user, teams, employees }) => ({ user, teams, employees})

const mapDispatch = { deleteEmployee }

export default connect(mapState, mapDispatch)(EmployeeLI)
