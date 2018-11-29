# Boilerplate

Hello! Welcome to our boilerplate code. To use this as your boilerplate:
--yadda yadda instructions on how to initialize in your own repo--
1--change BOILERPLATENAME in both public/index.html and the Navbar component
2--in package.json change string under key 'name', currently set as "Boilerplate"
3--change other relevant deets in package.json as well
4--add a secrets.js that looks like this:
const GOOGLE_CLIENT_ID = 'heregoesthething'
const GOOGLE_CLIENT_SECRET = 'heregoesthething'
const GOOGLE_CALLBACK = 'heregoesthething'
const SESSION_SECRET = 'heregoesthething'


module.exports = {
    SESSION_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_CALLBACK
}



-want to include:
    -detailed instructions on README markdown for how to make boilerplate your own (set up secrets, set up db name, etc)
    -detailed credits on package.json linking to the org repo and authors
    -list of app features on README
    -webpack optimization (probably should add detailed instructions on how this works too)
    -seeds for fake users and such
    -built-in internationalization and accessibility
    -oauth
    -tests
    -awesome responsive css
    -easy deployment on github?
    -easy deployment on heroku?


TODO:
-Add grommet
-fix loading issue
-internationalize
-1figure out whats up with webpack
