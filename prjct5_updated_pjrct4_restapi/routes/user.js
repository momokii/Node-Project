const router = require('express').Router()

const User = require('../models/user')
const { body } = require('express-validator')

const userController = require('../controllers/userController')
const isAuth = require('../middleware/is-auth')

const emailLimiter = require('../middleware/rate-limiter').emailReqLimiter


// * ------------------------------- route ------------------------------- * //

// * GET

// * flow 2 endpoint deluser
router.get('/delete', isAuth, userController.getDeleteUserToken)





// * POST
router.post('/forget_password', [
    body('email', 'Gunakan format email dengan benar!')
        .isEmail()
        .normalizeEmail()
] , emailLimiter, userController.getForgetPasswordToken )





// * PATCH
router.patch('/password', isAuth, [
    body('password_baru', 'Password harus berisi minimal 6 karakter dengan memiliki minimal 1 angka dan 1 karakter uppercase')
        .isStrongPassword({
            minLength: 6,
            minNumbers: 1,
            minSymbols: 0,
            minUppercase: 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password_baru) {
                throw new Error('Password konfirmasi tidak sesuai!')
            }
            return true
        })
],  userController.changePassword)


router.patch('/forget_password',[
    body('email', "Masukan format email dengan benar!")
        .isEmail()
        .normalizeEmail(),
    body('password', 'Password harus setidaknya mengandung 1 angka dan huruf Kapital dengan minimal sepanjang 6 karakter')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password) {
                throw new Error('Password konfirmasi tidak sesuai')
            }
            return true
        }),
], userController.changeForgetPassword )



// * DELETE

// * flow 2 endpoint deluser
router.delete('/delete', isAuth, userController.deleteUser)

// * flow 1 endpoint deluser
router.delete('/delete2', isAuth, userController.deleteUser2)

module.exports = router