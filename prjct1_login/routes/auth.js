//* import dependencies
const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const localLimiter = require('../util/rateLimiter').locaLimiter

//* import controller
const authController = require('../controllers/authController')

//* import models
const User = require('../models/users')

//* Session Checker
const Auth = require('../util/isAuth')


// **** GET ROUTES
router.get('/login', Auth.isLoggedOut, authController.getLogin)

router.get('/daftar', Auth.isLoggedOut, authController.getDaftarAkun)

router.get('/reset_password/:tokenId', authController.getNewPassword)

router.get('/reset_password', Auth.isLoggedOut, authController.getResetPasswordEmail)


//* POST ROUTES
router.post('/daftar', [
    body('email')
        .isEmail().withMessage("Masukan Format Email dengan benar!")
        .normalizeEmail()
        .custom((value, {req}) => {
            return (async () => {
                    const user = await User.findOne({email : value})
                    if(user) {
                        throw new Error('Email sudah digunakan, coba email lain!')
                    }
            })()
        }).withMessage("Email sudah digunakan, Coba email lain!") ,
    body('password', "Password Harus Alphanumerik dan minimal sepanjang 6 karakter")
        .isStrongPassword({
            minLength:6,
            minUppercase:0,
            minNumbers:1,
            minSymbols:0
        }),
    body('passwordKonfir')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw new Error("Password Konfirmasi tidak sesuai!")
            }
            return true
        }),
    body('nama', "Nama minimal gunakan 3 karakter")
        .isLength({min: 3})
        .isString()
], authController.postDaftar)


router.post('/login', localLimiter,
    [
        body('email', 'Masukan Format Email dengan benar!')
            .isEmail()
            .normalizeEmail(),
        body('password', "Email atau Password Salah!")
            .isStrongPassword({
                minLength:6,
                minUppercase:0,
                minNumbers:1,
                minSymbols: 0
            })
    ],
    authController.postLogin)


router.post('/reset_password',[
    body('email', "Masukan format email dengan benar!")
        .isEmail()
        .normalizeEmail()
] ,authController.postResetEmail)


router.post('/reset_password_konfirmasi',[
    body('password', "Password harus minimal 6 karakter dengan alphanumerik!")
        .isStrongPassword({
            minLength:6,
            minUppercase:0,
            minNumbers:1,
            minSymbols: 0
        }),
    body('passwordKonfir')
        .custom((value, {req}) => {
           if( value !== req.body.password ) {
               throw new Error("Password Konfirmasi tidak sesuai, coba ulangi lagi!")
           }
           return true
        })
] ,authController.postNewPassword)


router.post('/logout', authController.postLogout)


module.exports = router