const router = require('express').Router()
const { User } = require('../db/models')
const HttpError = require('../utils/HttpError')

router.param('id', (req, res, next, id) => {
	User.findById(id)
		.then((user) => {
			if (!user) throw HttpError(404)
			req.requestedUser = user
			next()
			return null
		})
		.catch(next)
})

router.post('/', (req, res, next) => {
	User.create(req.body)
		.then((user) => res.status(201).json(user))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	req.requestedUser
		.reload(User.options.scopes.populated())
		.then((requestedUser) => res.json(requestedUser))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	req.requestedUser
		.update(req.body)
		.then((user) => res.json(user))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	req.requestedUser
		.destroy()
		.then(() => res.sendStatus(202))
		.catch(next)
})

module.exports = router
