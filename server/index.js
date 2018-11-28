const db = require('./db')
const app = require('./app')
const PORT = process.env.PORT || 8080    // <------------------set the port here
const chalkAnimation = require('chalk-animation')

db.sync()
	.then(() => {
		chalkAnimation.rainbow('Postgres server up and running...', 1.25)
		app.listen(PORT, (err) => {
			if (err) throw err
			setTimeout( () => chalkAnimation.neon(`Listening on http://localhost:${PORT}`), 1500 ) //the setTimeout is only necessary for the chalkAnimation to work accordingly
		})
	})
	.catch(console.error)
