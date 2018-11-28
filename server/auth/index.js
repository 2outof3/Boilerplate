const router = require('express').Router()
const HttpError = require('../utils/HttpError')

router.use('/local', require('./local'))
router.use('/google', require('./google'))

/*-------  catches routes not found  -------  */
router.use((req, res, next) => {
  next(HttpError(404))
})

module.exports = router
