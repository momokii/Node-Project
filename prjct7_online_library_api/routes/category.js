const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const categoryController = require('../controllers/categoryController')


// * ----------------------------------- ROUTING -----------------------------------

router.get('/', categoryController.getCategory)

router.post('/', isAuth, categoryController.postCategory)

router.put('/', isAuth, categoryController.editCategory)

router.delete('/', isAuth, categoryController.deleteCategory)


module.exports = router