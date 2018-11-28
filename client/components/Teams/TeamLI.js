import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { deleteTeam } from '../../store'

/* -----------------    COMPONENT     ------------------ */
class TeamLI extends Component {
	render() {
		const {team, user, employees, deleteTeam} = this.props
		const authorizedView = !!user.employeeId
		const userInfo = authorizedView && employees.filter( empl => empl.id === user.employeeId)[0]
		const authorizedDeletion = authorizedView && userInfo.isCEO
		return (
			<li className="list-group-item team-item">
				<ul className="list-inline">
					{authorizedView ?
						<li>
							<Link to={`/teams/${team.id}`}>{team.name}</Link>
						</li> :
						<li>
							<div>{team.name}</div>
						</li>
					}
					{authorizedDeletion &&
						<li>
							<button onClick={ () => deleteTeam(team.id) }>❌</button>
						</li>
					}
				</ul>
			</li>
		)
	}
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({user, employees}) => ({user, employees})

const mapDispatch = { deleteTeam }

export default connect(mapState, mapDispatch)(TeamLI)
