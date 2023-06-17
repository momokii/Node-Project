const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const authorController = require('../controllers/authorController')


// * ----------------------------------- ROUTING -----------------------------------


router.get('/', authorController.getAuthors)

router.post('/', isAuth, authorController.postAuthor)

router.put('/', isAuth, authorController.editAuthor)

router.delete('/', isAuth, authorController.deleteAuthor)


module.exports = router