const db = require('./db')
const path = require('path')
const express = require('express')
const passport = require('passport')
const volleyball = require('volleyball')
const session = require('express-session')
const compression = require('compression')


if (process.env.NODE_ENV !== 'production') require('../secrets')

/* ----------------- passport registration ------------------ */

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
	try {
		const user = await db.models.user.findById(id)
		done(null, user)
	} catch (err) {
		done(err)
	}
})

/* ----------------- sessions ------------------ */


const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
sessionStore.sync()

if (process.env.NODE_ENV === 'test') { // global Mocha hook for testing
	after('close the session store', () => sessionStore.stopExpiringSessions())
}

/* ----------------- app ------------------ */

const app = express()

/* ----------------- logging ------------------ */

app.use(volleyball)

/* ----------------- parsing ------------------ */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ----------------- compression ------------------ */

app.use(compression())

/* ----------------- passport ------------------ */

app.use(
	session({
		secret: process.env.SESSION_SECRET || 'my face is smushy',
		store: sessionStore,
		resave: false,
		saveUninitialized: false
	})
)
app.use(passport.initialize())
app.use(passport.session())

/* ----------------- routes ------------------ */

app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

/* ----------------- session logging ------------------ */

	// app.use((req, res, next) => {
	// 	if (!req.session.counter) req.session.counter = 0
	// 	console.log(chalk.green('session counter', ++req.session.counter))
	// 	next()
	// })

	// app.use((req, res, next) => {
	// 	console.log(chalk.inverse('SESSION USER: ', req.user && req.user.id))
	// 	next()
	// })

/* ----------------- static file-serving ------------------ */

app.use(express.static(path.join(__dirname, '..', 'public')))

/* ----------------- remaining requests ------------------ */

app.use((req, res, next) => {
	if (path.extname(req.path).length) {
		const err = new Error('Not found')
		err.status = 404
		next(err)
	} else {
		next()
	}
})

/* ----------------- index.html ------------------ */

app.use('*', (req, res) => res.sendFile(path.join(__dirname, '..', 'public/index.html')))

/* ----------------- route validation version ------------------ */

// const validFrontendRoutes = ['/', '/home', '/teams', '/employees', '/teams/:id', '/employees/:id', '/signup', '/login']
// const indexPath = path.join(__dirname, '../public/index.html')
// validFrontendRoutes.forEach(stateRoute => {
// 	app.get(stateRoute, (req, res) => {
// 	  res.sendFile(indexPath)
// 	})
// })

/* ----------------- error handling ------------------ */

app.use((err, req, res, next) => {
	console.error(err)
	console.error(err.stack)
	res
		.status(err.status || 500)
		.send(err.message || 'Internal server error.')
})

module.exports = app
