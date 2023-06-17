const router = require('express').Router()
const { body } = require('express-validator')
const authController = require('../controllers/authController')
const isAuth = require('../middleware/is-auth')
const User = require('../models/users')
const statusCode = require('../util/status-code').httpStatus_keyValue

function throw_err(msg) {
    const err = new Error(msg)
    err.statusCode = statusCode['400_bad_request']
    throw err
}

// * ----------------------------------- ROUTING -----------------------------------

// *! Connection Check

router.get('/token-check', isAuth, async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        res.json({
            errors: false,
            message: 'Success Connect and JWT Active' ,
            data: {
                email: user.email,
                role: user.role
            }
        })
    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
})

router.get('/check', async (req, res, next) => {
    try {
        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Connect'
        })
    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
})

// *! --------------------------------------



router.post('/login', authController.login)





router.post('/signup',[
    body('email', "Use the Right Email Format!")
        .isEmail()
        .normalizeEmail()
        .custom((value, {req}) => {
            return (async () => {
                const user = await User.findOne({email: value})
                if(user){
                    throw_err('Email is Already in Use, Please Try a Different Email')
                }
            })()
        }),
    body('username')
        .isAlphanumeric()
        .isLength({min : 5})
        .custom((value, {req}) => {
            return (async () => {
                const user = await User.findOne({username: value})
                if(user){
                    throw_err('Username is Already in Use, Please Try a Different Username')
                }
            })()
        }),
    body('password', "Password Must Be Minimal 6 Character with 1 Number and 1 Uppercase")
        .isStrongPassword({
            minLength: 6,
            minUppercase: 1,
            minSymbols: 0,
            minNumbers: 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw_err('Confirmation Password not Match')
            }
            return true
        })

], authController.signUp)





router.post('/logout', isAuth, authController.logout )





router.post('/refresh', authController.refreshToken)





router.post('/forget-password',[
    body('email', "Use the Right Email Format!")
        .isEmail()
        .normalizeEmail()
],  authController.getForgetPasswordToken)





router.patch('/forget-password', [
    body('password', "Password Must Be Minimal 6 Character with 1 Number and 1 Uppercase")
        .isStrongPassword({
            minLength: 6,
            minUppercase: 1,
            minSymbols: 0,
            minNumbers: 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw_err('Confirmation Password not Match')
            }
            return true
        })
],authController.postForgetPassword)





router.patch('/password', isAuth, [
    body('password', "Password Must Be Minimal 6 Character with 1 Number and 1 Uppercase")
        .isStrongPassword({
            minLength: 6,
            minUppercase: 1,
            minSymbols: 0,
            minNumbers: 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if(value !== req.body.password){
                throw_err('Confirmation Password not Match')
            }
            return true
        })
], authController.changePassword )






module.exports = router