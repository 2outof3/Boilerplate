import axios from 'axios'

/* -----------------    ACTION TYPES    ------------------ */
const GET = 'GET_EMPLOYEES'
const MAKE = 'MAKE_EMPLOYEE'
const DELETE = 'DELETE_EMPLOYEE'
const UPDATE = 'UPDATE_EMPLOYEE'

/* ------------    ACTION CREATORS      ------------------ */
const init = (employees) => ({ type: GET, employees })
const create = (employee) => ({ type: MAKE, employee })
const remove = (id) => ({ type: DELETE, id })
const update = (employee) => ({ type: UPDATE, employee })

/* ------------         REDUCER         ------------------ */
export default function reducer(employees = [], action) {
	switch (action.type) {
		case GET:
			return action.employees

		case MAKE:
			return [action.employee, ...employees]

		case DELETE:
			return employees.filter((employee) => employee.id !== action.id)

		case UPDATE:
			return employees.map((employee) => (action.employee.id === employee.id ? action.employee : employee))

		default:
			return employees
	}
}

/* ------------       THUNK CREATORS     ------------------ */
export const getEmployees = () => (dispatch) => {
	axios
		.get('/api/employees')
		.then((res) => dispatch(init(res.data)))
		.catch((err) => console.error('Fetching employees unsuccessful', err))
}

export const makeEmployee = (employee) => (dispatch) => {
    axios
        .post('/api/employees', employee)
        .then((res) => dispatch(create(res.data)))
        .catch((err) => console.error(`Creating employee: ${employee} unsuccessful`, err))
}

export const deleteEmployee = (id) => (dispatch) => {
	axios.delete(`/api/employees/${id}`)
		.then(() => dispatch(remove(id)))
		.catch((err) => console.error(`Removing employee: ${id} unsuccessful`, err))
}

export const updateEmployee = (id, employee) => (dispatch) => {
	axios
		.put(`/api/employees/${id}`, employee)
		.then((res) => dispatch(update(res.data)))
		.catch((err) => console.error(`Updating employee: ${employee} unsuccessful`, err))
}
