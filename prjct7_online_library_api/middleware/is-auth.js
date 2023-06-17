require('dotenv').config()
const jwt = require('jsonwebtoken')
const statusCode = require('../util/status-code').httpStatus_keyValue
const User = require('../models/users')


module.exports = async (req, res, next) => {
    function token_not_valid(){
        const err = new Error('Token Not Valid!')
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try{
        const authHeader = req.get('Authorization')
        if(!authHeader){
            const err = new Error('Bearer Authorization Header Needed')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const token = authHeader.split(' ')[1]

        const decode_token = jwt.verify(token, process.env.JWT_SECRET)
        if(!decode_token){
            token_not_valid()
        }

        const user = await User.findById(decode_token.userId)
        if(!user){
            token_not_valid()
        }

        if(user.token.auth !==  decode_token.auth || user._id.toString() !== decode_token.userId || user.token.refresh !== decode_token.refreshToken){
            token_not_valid()
        }

        req.userId = user._id.toString()
        next()

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}


