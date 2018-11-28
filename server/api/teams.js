const router = require('express').Router()
const  { Team } = require('../db/models')
const HttpError = require('../utils/HttpError')


router.param('id', (req, res, next, id) => {
	Team.findById(id)
	  .then(team => {
		if (!team) throw HttpError(404)
		req.team = team
		next()
		return null
	  })
	  .catch(next)
  })

router.get('/', (req, res, next) => {
	Team.scope('populated')
		.findAll({})
		.then((teamsEagerLoaded) => res.json(teamsEagerLoaded))
		.catch(next)
})

router.post('/', (req, res, next) => {
	Team.create(req.body)
		.then((team) => team.reload(Team.options.scopes.populated()))
		.then((teamEagerLoaded) => res.status(201).json(teamEagerLoaded))
		.catch(next)
})

router.get('/:id', (req, res, next) => {
	req.team
		.reload(Team.options.scopes.populated())
		.then((team) => res.json(team))
		.catch(next)
})

router.put('/:id', (req, res, next) => {
	req.team
		.update(req.body)
		.then((team) => team.reload(Team.options.scopes.populated()))
		.then((teamEagerLoaded) => res.json(teamEagerLoaded))
		.catch(next)
})

router.delete('/:id', (req, res, next) => {
	req.team
		.destroy()
		.then(() => res.sendStatus(202))
		.catch(next)
})

module.exports = router
