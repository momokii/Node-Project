const router = require('express').Router()

const fileController = require('../controllers/fileController')

// * -------------- ROUTING --------------

router.get('/', fileController.getFile)

router.post('/', fileController.uploadFile)

router.delete('/', fileController.deleteFile)


module.exports = router