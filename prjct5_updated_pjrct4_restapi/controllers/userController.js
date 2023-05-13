require('dotenv').config()
const User = require('../models/user')
const statusCode = require('../util/response').httpStatus_keyValue
const {validationResult} = require('express-validator')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const mailjet = require('node-mailjet').apiConnect(process.env.MAILJET_API_KEY, process.env.MAILJET_API_SECRET)


//* -------------------------- update controller -------------------------- *//

exports.changePassword = async (req, res, next) => {

    function failed_change_pass(msg) {
        const err = new Error(msg)
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Failed Change Password')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const oldPassword = req.body.password_lama
        const newPassword = req.body.password_baru
        const user = await User.findById(req.userId)
        if (!user) {
            failed_change_pass('Auth Error, Failed change password')
        }

        const oldPassEqual = await bcrypt.compare(oldPassword, user.password)
        if(!oldPassEqual) {
            failed_change_pass('Password lama tidak sesuai dengan akun anda! ganti password gagal!')
        }

        const passEqual = await bcrypt.compare(newPassword, user.password)
        if(passEqual){
            failed_change_pass('Password baru sama dengan password lama, proses ganti password gagal, silahkan gunakan password baru yang berbeda!')
        }

        const newPass = await bcrypt.hash(newPassword, 12)

        user.password = newPass
        await user.save()

        res.status(statusCode['200_ok']).json({
            message: 'User success change password',
            user: {
                email: user.email,
                id: user._id.toString()
            }
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// * -- delete USER

// * flow 2 Endpoint

exports.getDeleteUserToken = async (req, res, next) => {
    try{

        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Auth Error, Failed get delete token')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const deleteToken = crypto.randomBytes(12).toString('hex')
        user.token.deleteAcc = deleteToken
        await user.save()

        res.status(statusCode['200_ok']).json({
            deleteUserToken : deleteToken,
            userId: user._id.toString(),
            email: user.email
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteUser = async (req, res, next) => {
    try{
        const deleteToken = req.body.deleteToken

        const user = await User.findById(req.userId)
        if(!user) {
            const err = new Error('Auth Failed, proses hapus akun gagal')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        if(user.token.deleteAcc !== deleteToken ){
            const err = new Error('Token tidak sesuai, hapus akun gagal!')
            err.statusCode = statusCode['406_not_acceptable']
            throw err
        }

        await User.findByIdAndDelete(req.userId)

        res.status(statusCode['200_ok']).json({
            message : 'Success delete user',
            user_deleted : {
                id: user._id.toString(),
                email: user.email
            }
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}


// * flow 1 Endpoint
exports.deleteUser2 = async (req, res, next) => {
    try{

        const user = await User.findById(req.userId)
        if(!user) {
            const err = new Error('auth Failed, hapus akun gagal!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        await User.findByIdAndDelete(req.userId)

        res.status(statusCode['200_ok']).json({
            message : 'Success delete user',
            user_deleted : {
                id: user._id.toString(),
                email: user.email
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
    try {

        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const err = new Error('Get Forget Token Failed!')
            err.statusCode = statusCode['406_unauthorized']
            err.data = errors.array()
            throw err
        }

        const user = await User.findOne({ email : req.body.email })
        if(!user) {
            const err = new Error('Failed get token, User not found!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const token = crypto.randomBytes(12).toString('hex')
        const forgetPassToken = jwt.sign({
            userId : user._id.toString(),
            email: user.email,
            token: token
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        } )

        await mailjet.post("send", {'version' : "v3.1"})
            .request({
                "Messages": [
                    {
                        "From" : {
                            "Email" : process.env.FROM_EMAIL,
                            "Name" : "Spotify Clone API"
                        },
                        "To" : [
                            {
                                "Email" : user.email,
                                "Name" : user.name
                            }
                        ],
                        "Subject" : "Forget Password Token",
                        "TextPart" : "",
                        "HTMLPart": `<p>Kode Lupa Password Anda </p> <br> <h3>Token : ${forgetPassToken}</h3> <br> <p>Silahkan tulis kode Anda dikolom yang disediakan</p> <p>Kode berlaku 15 Menit</p>`//,
                        //"CustomID": "AppGettingStartedTest"
                    }
                ]
            })

        user.token.forgetPass = token
        await user.save()

        res.status(statusCode['200_ok']).json({
            message: 'Success send token to email',
            token: forgetPassToken,
            user: {
                email: user.email,
                id: user._id
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.changeForgetPassword = async (req, res, next) => {
    function failed_change_pass(msg) {
        const err = new Error(msg)
        err.statusCode = statusCode['401_unauthorized']
        throw err
    }

    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            const err = new Error('Failed Change Password')
            err.statusCode = statusCode['406_not_acceptable']
            err.data = errors.array()
            throw err
        }

        const password = req.body.password
        const email = req.body.email
        const token = req.body.change_password_token

        const decoded_token = jwt.verify(token , process.env.JWT_SECRET)
        if(!decoded_token){
            failed_change_pass('Token tidak valid!')
        }

        const user = await User.findById(decoded_token.userId)
        if(!user) {
            failed_change_pass('Token tidak valid!')
        }

        if(user.email !== email){
            failed_change_pass('Email dimasukan tidak sesuai dengan data token!')
        }

        if(user._id.toString() !== decoded_token.userId || user.email !== decoded_token.email || user.token.forgetPass !== decoded_token.token ){
            failed_change_pass('Token tidak valid!')
        }

        const passEqual = await bcrypt.compare(password, user.password)
        if(passEqual) {
            failed_change_pass('Password baru sama dengan password lama, proses ganti password gagal!')
        }

        const newPassHash = await bcrypt.hash(password, 12)
        user.password = newPassHash
        user.token.forgetPass = null
        await user.save()

        res.status(statusCode['200_ok']).json({
            message: "Success change password from forget password",
            user: {
                email: user.email,
                id: user._id.toString()
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}