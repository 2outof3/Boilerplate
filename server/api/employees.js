const router = require('express').Router()
const {Employee} = require('../db/models')
const HttpError = require('../utils/HttpError')

router.param('id', (req, res, next, id) => {
	Employee.findById(id)
		.then((employee) => {
			if (!employee) throw HttpError(404)
			req.requestedEmployee = employee
			next()
			return null
		})
		.catch(next)
})

router.get('/', (req, res, next) => {
	Employee.findAll()
		.then((employees) => res.json(employees))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Employee.create(req.body)
		.then((employee) => res.status(201).json(employee))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	Employee.findById(req.params.id)
	  .then(employee => res.json(employee))
	  .catch(next)
})

router.put('/:id', (req, res, next) => {
	req.requestedEmployee
		.update(req.body)
		.then((employee) => res.json(employee))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	req.requestedEmployee.destroy()
		.then(() => res.sendStatus(202))
		.catch(next)
})

module.exports = router
