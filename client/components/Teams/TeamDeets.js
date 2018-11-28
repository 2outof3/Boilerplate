import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import NotFound from '../NotFound'
import ContentEditable from 'react-contenteditable'
import { updateTeam } from '../../store'
import { Link } from 'react-router-dom'

/* -----------------    COMPONENT     ------------------ */
class TeamDeets extends Component {
	constructor(props) {
		super(props)
		this.state = {
			team: props.team
        }
		this.onTeamUpdate = this.onTeamUpdate.bind(this)
	}
	componentWillReceiveProps(newProps, oldProps) {
		if (newProps.teams !== oldProps.teams) {
			this.setState({
				team: newProps.teams.filter(team => team.id === Number(this.props.match.params.id))[0]
			})
		}
	}
	render() {
		const team = this.state.team
		if (!team) return <NotFound /> // the team id is invalid
		const teammates = team.employees
		const {user, teams, employees} = this.props

		const userInfo = employees.filter(emp => emp.id === user.employeeId)[0]
		const teamLeader = userInfo.isLeader && team.id === userInfo.teamId
		const authorized = userInfo.isCEO || teamLeader
		return (
			<div >
				<ul>
					<li>
						<h2>You've reached the</h2>
						<h2>{`${team.name} Team's Page`}</h2>
					</li>
					<li>
						<div>What do we do?</div>
						<ContentEditable
							disabled={!authorized}
							value={team.description}
							html={team.description}
							onChange={evt => this.onTeamUpdate({ description: evt.target.value })}
							contentEditable={!!authorized}
						/>
					</li>
					<li>
						<div>If we could save one animal species from extinction we'd save the </div>
						<ContentEditable
							disabled={!authorized}
							value={team.spiritAnimal}
							html={team.spiritAnimal}
							onChange={evt => this.onTeamUpdate({ spiritAnimal: evt.target.value })}
							contentEditable={!!authorized}
						/>
					</li>
					{teammates.length ? teammates.filter( employee => employee.isLeader).length ? <li>
						<h3>Team Leadership:</h3>
						{teammates.filter( employee => employee.isLeader).map(employee => {
							return (
								<Link to={`/employees/${employee.id}`} key={employee.id}>
									<h3>{`${employee.firstName} ${employee.lastName} as ${employee.jobTitle}`}</h3>
								</Link>)})}
                                                                                   </li>
					: <div />
					: <div />
				}
				</ul>
				<ul>
				{teammates.length ? teammates.filter( employee => !employee.isLeader)
					.map( employee => {
						return (<li key={employee.id}>
							<Link to={`/employees/${employee.id}`}>{`${employee.firstName} ${employee.lastName} as a ${employee.jobTitle}`}</Link>
              </li>)
				}) : <div />}
				</ul>
			</div>
		)
	}
	onTeamUpdate(teamUpdateObj) {
		const { debouncedUpdateTeam } = this.props
		const { team } = this.state
		this.setState({
			team: Object.assign(team, teamUpdateObj)
		})
		debouncedUpdateTeam(Number(this.props.match.params.id), teamUpdateObj)
	}
}

/* -----------------    CONTAINER     ------------------ */
const mapState = ({employees, teams, user }, ownProps) => {
	const paramId = Number(ownProps.match.params.id)
	const team = teams.find((team) => team.id === paramId)
	return { team, teams, user, employees}
}

const mapDispatch = (dispatch, ownProps) => ({
	debouncedUpdateTeam: _.debounce((...args) => {
		dispatch(updateTeam(...args))
	}, 500)
})


export default connect(mapState, mapDispatch)(TeamDeets)
