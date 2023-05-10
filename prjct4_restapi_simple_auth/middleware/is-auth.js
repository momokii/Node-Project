const jwt = require('jsonwebtoken')
const statusCode = require('../util/response').httpStatus_keyValue
const User = require('../models/users')
require('dotenv').config()


module.exports = async (req, res, next) => {
    try {

        const authHeader = req.get('Authorization')
        if(!authHeader){
            const err = new Error('No Authorization Header!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        function token_not_valid(){
            const err = new Error('Token tidak valid!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const token = authHeader.split(' ')[1]

        let decodedToken
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        } catch (e) {
            e.statusCode = statusCode['500_internal_server_error']
            throw e
        }
        if(!decodedToken){
            token_not_valid()
        }

        const user = await User.findById(decodedToken.userId)
        if(!user){
            token_not_valid()
        }

        if(user.username !== decodedToken.username || user.refresh_token !== decodedToken.refreshToken || user.token !== decodedToken.token) {
            token_not_valid()
        }

        req.userId = decodedToken.userId
        next()

    } catch(e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }

}