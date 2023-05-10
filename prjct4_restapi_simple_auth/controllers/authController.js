const User = require('../models/users')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const { validationResult } = require('express-validator')
const statusCode = require('../util/response').httpStatus_keyValue
require('dotenv').config()


// * ------------------------ CONTROLLER ------------------------

exports.signup = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error("Daftar Gagal, Data tidak sesuai!")
            err.statusCode = statusCode['422_unprocessable_entity']
            err.data = errors.array()
            throw err
        }

        const username = req.body.username
        const password = req.body.password
        const name = req.body.name


        const hashPassword = await bcrypt.hash(password, 12)

        const user = new User({
            username : username,
            password : hashPassword,
            name : name
        })

        const savedUser = await user.save()

        res.status(statusCode['201_created']).json({
            message : "User Success Created",
            User : {
                userId : savedUser._id,
                username : savedUser.username
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
    const username = req.body.username
    const password = req.body.password

    try {

        const user = await User.findOne({ username : username })
        if (!user) {
            const err = new Error('Username/ Password salah! username')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const isEqual = await bcrypt.compare(password, user.password)
        if(!isEqual){
            const err = new Error('Username/ Password salah!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const refreshToken = jwt.sign({
            username: user.username,
            userId : user._id.toString(),
        }, process.env.JWT_SECRET)

        const token = crypto.randomBytes(32).toString('hex')
        const accessToken = jwt.sign({
            username : user.username,
            userId : user._id.toString(),
            token: token,
            refreshToken : refreshToken
        }, process.env.JWT_SECRET, {
            expiresIn : '1h'
        })

        user.refresh_token = refreshToken
        user.token = token
        await user.save()

        res.status(statusCode['200_ok']).json({
            accessToken : accessToken,
            refreshToken : refreshToken,
            username : user.username,
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

        const user = await User.findOne({ username : decoded_token.username })
        if(!user){
            token_not_valid()
        }

        if(user.username !== decoded_token.username || user.refresh_token !== refreshToken ){
            token_not_valid()
        }

        const token = crypto.randomBytes(32).toString('hex')
        const new_access_token = jwt.sign({
            username : user.username,
            userId : user._id.toString(),
            refreshToken : refreshToken,
            token: token
        }, process.env.JWT_SECRET, {
            expiresIn : '1h'
        })

        user.token = token
        await user.save()

        res.status(statusCode['200_ok']).json({
            accessToken : new_access_token,
            expiresIn : 3600,
            token_type: 'Bearer',
            username : user.username
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
            const err = new Error('Auth Error')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        user.refresh_token = null
        user.token = null
        await user.save()

        res.status(statusCode['202_accepted']).json({
            status : 'log out',
            username : user.username
        })

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}