const router = require('express').Router()
const statusCode = require('../util/status-code').httpStatus_keyValue
const isAuth = require('../middleware/is-auth')
const publisherController = require('../controllers/publisherController')


// * ----------------------------------- ROUTING -----------------------------------

router.get('/',  publisherController.getPublishers)

router.post('/', isAuth, publisherController.postPublisher)

router.put('/', isAuth, publisherController.editPublisher)

router.delete('/', isAuth, publisherController.deletePublisher)


module.exports = router