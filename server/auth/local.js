const router = require('express').Router()
const { User, Employee } = require('../db/models')

router.post('/login', async (req, res, next) => {
	try {
		const user = await User.findOne({where: {username: req.body.username}, include: [{ model: Employee, as: 'employee' }]})
	  if (!user) {
			console.log('No such user found:', req.body.username)
			res.status(401).send('Wrong username and/or password')
		}
		else if (!user.correctPassword(req.body.password)) {
			('Incorrect password for user:', req.body.username)
			res.status(401).send('Wrong username and/or password')
		}
		else {
			req.login(user, err => (err ? next(err) : res.json(user)))
	  }
	}
	catch (err) {
	  next(err)
	}
})

router.post('/signup', async (req, res, next) => {
	try {
		const user = await User.create(req.body)
		req.login(user, err => (err ? next(err) : res.json(user)))
	}
	catch (err) {
		if (err.name === 'SequelizeUniqueConstraintError') {
			res.status(401).send('Username already exists')
		} else {
			next(err)
		}
	}
})

router.post('/logout', (req, res) => {
req.logout()
req.session.destroy()
res.redirect('/')
})

router.get('/me', (req, res, next) => {
	res.send(req.user)
})

module.exports = router
