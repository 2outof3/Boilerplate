const router = require('express').Router()
const HttpError = require('../utils/HttpError')

const {Translate} = require('@google-cloud/translate');

// Your Google Cloud Platform project ID
const projectId = 'locale-translate';

// Instantiates a client
const translate = new Translate({
  projectId: projectId,
  key: 'AIzaSyB7oEGPIm8Re7isthIdOS668Yb6Qka9RDw'
});


router.post('/lang', async (req, res, next) => {
	try {
		const {data,target} = req.body
		const result = {}
		for(let key in data){
			const comp = await translate.translate(data[key], target)
			result[key] = comp[0]
		}
		res.send(result)
	} catch(error) {
		console.log(error)
	}
})
router.use('/users', require('./users'))
router.use('/employees', require('./employees'))
router.use('/teams', require('./teams'))

/*-------  catches routes not found  -------  */
router.use((req, res, next) => {
  next(HttpError(404))
})

module.exports = router
