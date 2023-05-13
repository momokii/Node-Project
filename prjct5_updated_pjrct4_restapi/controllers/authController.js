require('dotenv').config()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const statusCode = require('../util/response').httpStatus_keyValue
const { validationResult }  = require('express-validator')



//* -------------------------- controller -------------------------- *//

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('SignUp Gagal, Data tidak sesuai')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const email = req.body.email
        const password = req.body.password
        const name = req.body.name
        const role = req.body.role

        const hashPassword = await bcrypt.hash(password, 12)

        const user = new User({
            email: email,
            password: hashPassword,
            name: name,
            role: role
        })

        const savedUser = await user.save()

        res.status(statusCode['201_created']).json({
            message : "User Success Created",
            user : {
                id : savedUser._id.toString(),
                email : savedUser.email
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}



exports.login = async (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    function login_failed(){
        const err = new Error('email / password salah!')
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('email/ password salah!')
            err.statusCode = statusCode['401_unauthorized']
            err.data = errors.array()
            throw err
        }

        const user = await User.findOne({ email : email})
        if (!user) {
            login_failed()
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
            login_failed()
        }

        const refreshToken = jwt.sign({
            email: user.email,
            userId : user._id.toString(),
        }, process.env.JWT_SECRET)

        const authToken = crypto.randomBytes(32).toString('hex')
        const accessToken = jwt.sign({
            email : user.email,
            userId : user._id.toString(),
            authToken: authToken,
            refreshToken : refreshToken
        }, process.env.JWT_SECRET, {
            expiresIn : '1h'
        })

        user.token.refresh = refreshToken
        user.token.auth = authToken
        await user.save()

        res.status(statusCode['200_ok']).json({
            accessToken : accessToken,
            refreshToken : refreshToken,
            email : user.email,
            expiresIn : 3600,
            token_type : 'Bearer'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}



exports.refreshToken = async (req, res, next) => {
    const refreshToken = req.body.refresh_token

    function token_not_valid() {
        const err = new Error('refresh Token tidak Valid!')
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try {

        const decoded_token = jwt.verify(refreshToken, process.env.JWT_SECRET)

        if(!decoded_token) {
            token_not_valid()
        }

        const user = await User.findOne({ email : decoded_token.email })
        if(!user){
            token_not_valid()
        }

        if( user._id.toString() !== decoded_token.userId.toString() || user.email !== decoded_token.email || user.token.refresh !== refreshToken ){
            token_not_valid()
        }

        const authToken = crypto.randomBytes(32).toString('hex')
        const new_access_token = jwt.sign({
            email : user.email,
            userId : user._id.toString(),
            refreshToken : refreshToken,
            authToken: authToken
        }, process.env.JWT_SECRET, {
            expiresIn : '1h'
        })

        user.token.auth = authToken
        await user.save()

        res.status(statusCode['200_ok']).json({
            accessToken : new_access_token,
            expiresIn : 3600,
            token_type: 'Bearer',
            email : user.email
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}



exports.logout = async (req, res, next) => {
    try {

        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Auth Error, failed logout')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        user.token.refresh = null
        user.token.auth = null
        await user.save()

        res.status(statusCode['202_accepted']).json({
            status : 'log out',
            email: user.email
        })

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}




