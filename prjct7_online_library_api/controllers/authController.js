require('dotenv').config()
const User = require('../models/users')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const statusCode = require('../util/status-code').httpStatus_keyValue

//*! TEMPLATE CONTROLLER
// async (req, res, next) => {
//     try{
//
//     } catch (e) {
//         if(!e.statusCode) {
//             e.statusCode = statusCode['500_internal_server_error']
//         }
//         next(e)
//     }
// }

// * ----------------------------------- CONTROLLER -----------------------------------

exports.signUp = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Signup Failed!')
            err.statusCode = statusCode['400_bad_request']
            err.data = errors.array()
            throw err
        }

        const password = req.body.password
        const hashPassword = await bcrypt.hash(password, 12)
        const role = req.body.role

        const user = new User({
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
            password: hashPassword,
            address: {
                prov: req.body.provinsi,
                kota: req.body.kota,
                kec: req.body.kecamatan
            },
            role: role
        })

        await user.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: 'Success Created New User'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.login = async (req, res, next) => {
    try{
        const email = req.body.email
        const password = req.body.password

        const user = await User.findOne({email : email})
        if(!user){
            const err = new Error('Wrong Email / Password! email')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const pass_equal = await bcrypt.compare(password, user.password)
        if(!pass_equal){
            const err = new Error('Wrong Email / Password!')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const authRefreshToken = crypto.randomBytes(16).toString('hex')
        const refreshToken = jwt.sign({
            userId: user._id.toString(),
            email: user.email,
            token_random: authRefreshToken
        }, process.env.JWT_SECRET)

        const authToken = crypto.randomBytes(32).toString('hex')
        const accessToken = jwt.sign({
            auth: authToken,
            refreshToken: refreshToken,
            userId: user._id.toString()
        }, process.env.JWT_SECRET, {
            //expiresIn: '1h'
            expiresIn: '6h'
        })

        user.token.auth = authToken
        user.token.refresh = refreshToken

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Login",
            data: {
                access_token : accessToken,
                refresh_token: refreshToken,
                auth_type: 'Bearer',
                expires_in: '1h'
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.logout = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        user.token.auth = null
        user.token.refresh = null

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Logout"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.refreshToken = async (req, res, next) => {
    try{
        function token_not_valid(){
            const err = new Error('Refresh Token Not Valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const refresh_token = req.body.refresh_token

        const decoded_refresh = jwt.verify(refresh_token, process.env.JWT_SECRET)
        if(!decoded_refresh){
            token_not_valid()
        }

        const user = await User.findById(decoded_refresh.userId)
        if(!user){
            token_not_valid()
        }

        if(decoded_refresh.email !== user.email || refresh_token !== user.token.refresh){
            token_not_valid()
        }

        const authToken = crypto.randomBytes(32).toString('hex')
        const newAccessToken = jwt.sign({
            auth: authToken,
            refreshToken: refresh_token,
            userId: user._id.toString()
        }, process.env.JWT_SECRET, {
            //expiresIn: '1h'
            expiresIn: '6h'
        })

        user.token.auth = authToken
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Get New Access Token',
            data: {
                access_token : newAccessToken,
                token_type: 'Bearer',
                expires_in: '1h'
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getForgetPasswordToken = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Use the Right Email Format!')
            err.statusCode = statusCode['406_not_acceptable']
            throw err
        }

        const user = await User.findOne({email: req.body.email})
        if(!user){
            const err = new Error('Account With Email Input Not Found!')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const forgetPassToken = crypto.randomBytes(8).toString('hex')
        const forgetToken = jwt.sign({
            userId: user._id.toString(),
            email: user.email,
            token: forgetPassToken
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        })

        user.token.forgetPass = forgetPassToken
        await user.save()

        //*! JIKA MAU TAMBAH KIRIM EMAIL

        //*! ---------------------------

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Get Forget Password Token',
            data: {
                forget_password_token: forgetToken,
                expires_in: '15m'
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.postForgetPassword = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Input Password Error!')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        function token_not_valid(){
            const err = new Error('Token Not Valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const email = req.body.email
        const password = req.body.password
        const token = req.body.token

        let decode_token = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode_token){
            token_not_valid()
        }

        const user = await User.findById(decode_token.userId)
        if(!user){
            token_not_valid()
        }

        if(decode_token.userId !== user._id.toString() || decode_token.token !== user.token.forgetPass || decode_token.email !== user.email){
            token_not_valid()
        }

        const newPassword = await bcrypt.hash(password, 12)
        user.password = newPassword
        user.token.forgetPass = null
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Set New Password From Forget Password"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.changePassword = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Input Password Error')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const pass_eq = await bcrypt.compare(req.body.old_password, user.password)
        if(!pass_eq){
            const err = new Error('Old Password not Match with Your Account Password')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const new_password = await bcrypt.hash(req.body.password, 12)
        user.password = new_password
        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Change Account Password"
        })

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}



