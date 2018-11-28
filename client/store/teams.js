import axios from 'axios'

/* -----------------    ACTION TYPES     ------------------ */
const GET = 'GET_TEAMS'
const MAKE = 'MAKE_TEAM'
const DELETE = 'DELETE_TEAM'
const UPDATE = 'UPDATE_TEAM'

/* -----------------    ACTION CREATORS     ------------------ */
const init = (teams) => ({ type: GET, teams })
const create = (team) => ({ type: MAKE, team })
const remove = (id) => ({ type: DELETE, id })
const update = (team) => ({ type: UPDATE, team })

/* ------------         REDUCER         ------------------ */
export default function reducer(teams = [], action) {
	switch (action.type) {
		case GET:
			return action.teams

		case MAKE:
			return [action.team, ...teams]

		case DELETE:
			return teams.filter((team) => team.id !== action.id)

		case UPDATE:
			return teams.map((team) => (action.team.id === team.id ? action.team : team))

		default:
			return teams
	}
}

/* -----------------    THUNK CREATORS     ------------------ */
export const getTeams = () => (dispatch) => {
	axios
		.get('/api/teams')
		.then((res) => dispatch(init(res.data)))
		.catch((err) => console.error('Fetching teams unsuccessful', err))
}

export const makeTeam = (team) => (dispatch) => {
    axios
        .post('/api/teams', team)
        .then((res) => dispatch(create(res.data)))
        .catch((err) =>
            console.error(`Creating team: ${team} unsuccessful`, err))
}

export const deleteTeam = (id) => (dispatch) => {
	axios
		.delete(`/api/teams/${id}`)
		.then(() => dispatch(remove(id)))
		.catch((err) =>
			console.error(`Removing team: ${id} unsuccessful`, err))
}

export const updateTeam = (id, team) => (dispatch) => {
	axios
		.put(`/api/teams/${id}`, team)
		.then((res) => dispatch(update(res.data)))
		.catch((err) =>
			console.error(`Updating team: ${team} unsuccessful`, err))
}
