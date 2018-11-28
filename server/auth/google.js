const passport = require('passport')
const router = require('express').Router()
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const chalk = require('chalk')
const { User } = require('../db/models')

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
	console.log(`Skipping OAuth...`)
} else {
	const googleConfig = {
		clientID: process.env.GOOGLE_CLIENT_ID,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		callbackURL: process.env.GOOGLE_CALLBACK
	}
	const strategy = new GoogleStrategy(
		googleConfig, (token, refreshToken, profile, done) => {
			const googleId = profile.id
			const name = profile.displayName
			const email = profile.emails[0].value
			User.findOrCreate({	where: { googleId }, defaults: { name, email }})
			.then(([user]) => done(null, user))
			.catch(done)
		}
	)

	passport.use(strategy)
	router.get( '/', passport.authenticate('google', { scope: 'email' }))
	router.get( '/callback',
		passport.authenticate('google', {
			successRedirect: '/home',
			failureRedirect: '/login'
		}))
	const google = chalk.blueBright('G') + chalk.red('o') + chalk.yellow('o') + chalk.blueBright('g') + chalk.green('l') + chalk.red('e')
	console.log(`${google} OAuth Enabled✓`)
}

module.exports = router
