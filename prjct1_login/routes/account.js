//* import dependencies
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const localLimiter = require('../util/rateLimiter').locaLimiter

//* controller
const accountController = require('../controllers/accountController')

//* session checker
const Auth = require('../util/isAuth')

// **** GET ROUTES
router.get('/', Auth.isAuth, accountController.getInfo)

router.get('/change_name', Auth.isAuth, accountController.getChangeName)

router.get('/change_password', Auth.isAuth, accountController.getChangePassword)

router.get('/delete_account', Auth.isAuth, accountController.getDeleteAccount)

router.get('/delete_account_get_token', Auth.isAuth, accountController.getDeleteAccountToken)


// **** POST ROUTES
router.post('/change_name', [
    body('nama', "Nama minimal gunakan 3 karakter")
        .isLength({min: 3})
        .isString()
],accountController.postChangeName)


router.post('/change_password', localLimiter,
    [
        body('passwordBaru', 'Password Harus sepanjang minimal 6 karakter dan alphanumerik!')
            .isStrongPassword({
                minLength:6,
                minUppercase:0,
                minSymbols:0,
                minNumbers:1
            }),
        body('passwordBaruKonfirmasi')
            .custom((value, {req}) => {
                if(value !== req.body.passwordBaru) {
                    throw new Error('Gagal!, Password Baru dengan Password Konfirmasi tidak sesuai')
                }
                return true
            })

    ],
    accountController.postChangePassword)


router.post('/delete_account', accountController.postDeleteAccountConfirm)


module.exports = router