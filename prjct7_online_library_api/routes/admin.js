const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const adminController = require('../controllers/adminController')

// * ----------------------------------- ROUTING -----------------------------------


router.get('/users', isAuth, adminController.getAllUsers)

module.exports = router