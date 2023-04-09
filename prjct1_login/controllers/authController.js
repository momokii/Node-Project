//* import dependencies
const { validationResult } = require('express-validator')
const { ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const flashController = require('../util/flash_controller')
const deepEqual = require('deep-equal')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const httpStatus = require('../util/httpStatus').httpStatus_keyValue

//* import models
const User = require('../models/users')

//* const DEFINED
const FROM_EMAIL = "YOUR_EMAIL"
const SECRET_KEY_JWT = "SECRET_KEY"

//* config sendgrid / mail sender
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: 'API_KEY'
    }
}))


// * **********************================= GET GET GET =================**********************

exports.getLogin = (req, res, next) => {
    let messageFlash = flashController.getMessageFlash(req.flash('message'))
    res.render('auth/login', {
        pageTitle: 'Login',
        message: messageFlash,
        errorMessage: null,
        oldInput: {email : ''}
    })
}

exports.getDaftarAkun = (req, res, next) => {
    let message = flashController.getMessageFlash(req.flash('error'))

    res.render('auth/daftar', {
        pageTitle: 'Daftar Akun',
        errorMessage: message,
        oldInput: { email: '', password: '', passwordkonfir: '', nama: '' }
    })
}

exports.getResetPasswordEmail = (req, res, next) => {
    let message = flashController.getMessageFlash(req.flash('error'))

    res.render('auth/resetPassEmail', {
        pageTitle: 'Email Reset Password',
        errorMessage: message
    })
}

exports.getNewPassword = (req, res, next) => {
    const token = req.params.tokenId

    let message = flashController.getMessageFlash(req.flash('error'))
    async function getNewPass() {
        try {
            const user = await User.findOne({ 'token.reset' : token })
            if(!user) {
                return next(new Error('User tidak ada'))
            }
            const dataToken = {
                id: user._id.toString(),
                email: user.email,
                password: user.password
            }
            await jwt.verify(token, SECRET_KEY_JWT, (err, decoded) => {

                if(err){
                    req.flash('message', 'Gagal!, Token Error / Salah / Kedaluarsa!')
                    res.redirect('/login')
                }

                const userDataToken = {
                    id: decoded.id,
                    email: decoded.email,
                    password: decoded.password
                }

                if(deepEqual(dataToken, userDataToken)) {
                    return res.render('auth/resetPass', {
                        pageTitle: 'Reset Password',
                        errorMessage: message,
                        idUser: user._id,
                        token: token
                    })
                }

                return next(new Error('Token tidak valid'))
            })

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    getNewPass()

}



// * **********************============== POST POST POST ==============**********************

exports.postDaftar = (req, res, next) => {
    const email = req.body.email
    const nama = req.body.nama
    const password = req.body.password

    const invalidDataRender = (errorMessage) => {
        res.status(httpStatus['400_bad_request']).render('auth/daftar', {
            pageTitle: 'Daftar Akun',
            errorMessage: errorMessage,
            oldInput: { email: email, nama: nama }
        })
    }

    //* cek error validasi input
    const errors = validationResult(req)
    if(!errors.isEmpty())  {
        console.log(errors.array())
        return invalidDataRender(errors.array()[0].msg)
    }

    //* tambah user
    async function tambahUser() {
        try {
            const hashingPass = await bcrypt.hash(password, 16)
            const user = new User({
                email: email,
                nama: nama,
                password: hashingPass
            })
            await user.save()

            req.flash('message', 'Akun Anda berhasil dibuat, silahkan login!')
            res.redirect('/login')
            return transporter.sendMail({
                to: email,
                from: FROM_EMAIL,
                subject: 'Berhasil Daftar Akun',
                html: '<h4>Selamat!, Anda berhasil mendaftarkan Anda!</h4>'
            })

        } catch (error) {
            console.log(error)
            return next(new Error(error))
        }
    }
    tambahUser()

}


exports.postLogin = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    const invalidDataRender = (errorMessage) => {
        res.status(httpStatus['400_bad_request']).render('auth/login', {
            pageTitle: 'Login',
            message: null,
            errorMessage: errorMessage,
            oldInput: { email: email }
        })
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        console.log(errors.array())
        return invalidDataRender(errors.array()[0].msg)
    }

    //* login process
    async function login(){
        try{
            const user = await User.findOne({email : email})
            if (!user){
                return invalidDataRender('Email atau Password Salah!')
            }
            const passwordMatch = await bcrypt.compare(password, user.password)
            if(!passwordMatch) {
                return invalidDataRender('Email atau Password Salah!')
            }

            req.session.user = user
            req.session.isLoggedIn = true

            await req.session.save()
            return res.redirect('/')

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    login()

}


exports.postLogout = (req, res, next) => {
    req.session.destroy(err => {
        console.log(err)
        res.redirect('/login')
    })
}


exports.postResetEmail = (req, res, next) => {
    const email = req.body.email

    const invalidTokenRender = (message) => {
        res.status(httpStatus['400_bad_request']).render('auth/resetPassEmail', {
            pageTitle: 'Email Reset Password',
            errorMessage: message
        })
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        console.log(errors)
        return invalidTokenRender(errors.array()[0].msg)
    }
    //* proses kirim token
    async function kirimToken() {
        try {
            const user = await User.findOne({email : email})
            if(!user) {
                return invalidTokenRender('Akun tidak ditemukan pada email yang diinputkan, silahkan coba lagi!')
            }

            if(user.token.reset && user.token.resetTokenInterval > Date.now()){
                return invalidTokenRender('Permintaan token reset password pada email yang sama maksimal 1 kali tiap 10 menit')
            }

            const dataToken = {
                id: user._id,
                email: user.email,
                password: user.password
            }
            const token = jwt.sign(dataToken, SECRET_KEY_JWT, {
                expiresIn:'1h'
            })
            user.token.reset = token
            user.token.resetTokenInterval = Date.now() + (1000 * 60 * 10)
            await user.save()

            req.flash('message', 'Berhasil minta reset password, check email Anda!')
            res.redirect('/login')
            return transporter.sendMail({
                to: req.body.email,
                from: FROM_EMAIL,
                subject: 'Reset Password Confirmation!',
                html:`<p>Anda meminta reset password</p> <p>Click <a href="http://localhost:3000/reset_password/${token}">Link Ini</a> untuk set password baru</p> <p>Link terlampir hanya berlaku 1 Jam</p>`
            })

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    kirimToken()

}


exports.postNewPassword = (req, res, next) => {
    const password = req.body.password
    const token = req.body.token
    const userId = req.body.idUser

    const invalidRender = (message) => {
        req.flash('error', message)
        res.redirect('/reset_password/' + token)
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors.array())
        return invalidRender(errors.array()[0].msg)
    }

    async function gantiPassword() {
        try {
            const checkToken = jwt.verify(token, SECRET_KEY_JWT)

            if(checkToken) {
                const user = await User.findOne({ _id: new ObjectId(userId) })

                const match = await bcrypt.compare(password, user.password)
                if(match){
                    return invalidRender('Gagal!, Anda set password baru Anda sama dengan password lama, silahkan coba password lain')
                }

                const newPassHash = await bcrypt.hash(password, 16)

                user.password = newPassHash
                user.token.reset = null

                await user.save()
                req.flash('message', 'Anda berhasil ganti password!')
                return res.redirect('/login')
            }

            return next(new Error('Token Error!'))

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    gantiPassword()

}
















