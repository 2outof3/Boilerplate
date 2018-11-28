import React, { Component } from 'react'
import { connect } from 'react-redux'
import  TeamLI  from './TeamLI'
import { makeTeam } from '../../store'

/* -----------------    COMPONENT     ------------------ */
class TeamList extends Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			id: props.teams.length + 1
		}
		this.onSubmit = this.onSubmit.bind(this)
		this.renderNewTeamWidget = this.renderNewTeamWidget.bind(this)

	}
	render() {
		const { teams, user, employees } = this.props
		const userInfo = employees.length ? employees.filter(emp => emp.id === user.employeeId)[0] : {}
		return (
			<div >
				<ul className="list-group" >
				{ userInfo.isCEO && this.renderNewTeamWidget() }
					{teams.sort((a, b) => {
						if (a.name < b.name) return -1
						if (a.name > b.name) return 1
						return 0
					}).map(team => {
						return <TeamLI team={team} key={team.id} />
					})}
				</ul>
			</div>
		)
	}
	onSubmit(event) {
		event.preventDefault()
		const { makeTeam } = this.props
		const { name } = event.target
		const newTeam = {
			name: name.value,
			id: this.state.id
		}
		makeTeam(newTeam)
	}
	renderNewTeamWidget(){
		return (
			<form onSubmit={this.onSubmit} className="list-group-item team-item">
					<div className="media-left media-middle icon-container">
						<button type="submit"><span>➕</span></button>
					</div>
					<div className="media-body">
						<h4 className="media-heading tucked">
							<input name="name" type="text" placeholder="Team Name" />
						</h4>
					</div>
			</form>
		  )
	}
}

/* -----------------    CONTAINER     ------------------ */

const mapState = ({ teams, user, employees }) => ({ teams, user, employees })

const mapDispatch = { makeTeam }


export default connect(mapState, mapDispatch)(TeamList)
