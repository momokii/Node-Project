//* import dependencies
const {validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const flashMessage = require('../util/flash_controller')
const crypto = require('crypto')
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const httpStatus = require('../util/httpStatus').httpStatus_keyValue

//* set Transporter email
const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key : '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'
    }
}))
const FROM_EMAIL = 'kelanachandra7@gmail.com'


//* import models
const User = require('../models/users')



// * **********************================= GET GET GET =================**********************
exports.getInfo = (req, res, next) => {

    let message = flashMessage.getMessageFlash(req.flash('message'))

    res.render('index', {
        pageTitle: 'Info AKun',
        user : {
            email: req.user.email,
            nama: req.user.nama
        },
        message: message
    })
}

exports.getChangeName = (req, res, next) => {
    const message = flashMessage.getMessageFlash(req.flash('error'))

    res.render('account/changeName', {
        pageTitle: 'Ganti Nama',
        errorMessage: message,
        user: {
            nama: req.user.nama
        }
    })
}


exports.getChangePassword = (req, res, next) => {
    const message = flashMessage.getMessageFlash(req.flash('error'))

    res.render('account/changePassword', {
        pageTitle: 'Ganti Password',
        errorMessage: message,
        user: {
            nama: req.user.nama
        }
    })
}


exports.getDeleteAccount = (req, res, next) => {
    let message = flashMessage.getMessageFlash(req.flash('message'))

    res.render('account/deleteAccount', {
        pageTitle: 'Hapus Account',
        message: message,
        user: {
            nama: req.user.nama
        }
    })
}


exports.getDeleteAccountToken = (req, res, next) => {
    async function getTokenDeleteAccount() {
        try{
            const user = await User.findOne({email: req.user.email})
            if (!user) {
                req.flash('message', 'Gagal, Terjadi Kesalahan saat mencari info Akun!')
                return res.redirect('/delete_account')
            }

            if (user.token.deleteAccountInterval != null && user.token.deleteAccountInterval > Date.now()) {
                req.flash('message', 'Gagal, Hanya bisa minta token dalam 10 menit sekali!')
                return res.redirect('/delete_account')
            }

            const tokenDelete = crypto.randomBytes(16).toString('hex')

            user.token.deleteAccount = tokenDelete
            user.token.deleteAccountInterval = Date.now() + (1000 * 60 * 10) //* 10 menit
            user.token.deleteAccountExp = Date.now() + (1000 * 60 * 60) //* 1 jam
            await user.save()
            req.user = user
            req.session.user = user

            req.flash('message', 'Berhasil set Token Hapus, silahkan cek email untuk dapatkan token Anda!')
            res.redirect('/delete_account')
            return transporter.sendMail({
                to: req.user.email,
                from: FROM_EMAIL,
                subject: 'Token Hapus Akun',
                html: `<p>Kode Hapus Account Anda </p> <br> <h3>Token : ${tokenDelete}</h3> <br> <p>Silahkan tulis kode Anda dikolom yang disediakan</p> <p>Kode berlaku Satu Jam </p>`
            })

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    getTokenDeleteAccount()

}




// * **********************================= POST POST POST =================**********************

exports.postChangeName = (req, res, next) => {
    const newName = req.body.nama

    const invalidRender = (message) => {
        res.status(httpStatus['400_bad_request']).render('account/changeName', {
            pageTitle: 'Ganti Nama',
                errorMessage: message,
                user: { nama: req.user.nama }
        })
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors.array())
        return invalidRender(errors.array()[0].msg)
    }

    async function changeName() {
        try {
            const user = await User.findOne({email : req.user.email})
            if(!user){
                return invalidRender('Error saat mengganti nama')
            }

            user.nama = newName
            req.user.nama = newName
            req.session.user.nama = newName
            await user.save()

            req.flash('message', 'berhasil ganti nama Anda menjadi ' + newName)
            return res.redirect('/')

        } catch (e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    changeName()
}



exports.postChangePassword = (req, res, next) => {
    const oldPassword = req.body.passwordLama
    const newPassword = req.body.passwordBaru

    const invalidRender = (message) => {
        res.status(httpStatus['400_bad_request']).render('account/changePassword', {
            pageTitle: 'Ganti Password',
            errorMessage: message,
            user: {
                nama: req.user.nama
            }
        })
    }

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        console.log(errors.array())
        return invalidRender(errors.array()[0].msg)
    }

    async function changePassword(){
        try {
            const user = await User.findOne({email : req.user.email})
            const checkPass = await bcrypt.compare(oldPassword, user.password)
            if(!checkPass){
                return invalidRender('Gagal!, Password Lama tidak sesuai dengan password Anda!')
            }

            if(oldPassword === newPassword){
                return invalidRender('Gagal!, Anda set password baru sama dengan password lama Anda, coba password lain')
            }

            const newHashPass = await bcrypt.hash(newPassword, 16)
            user.password = newHashPass
            req.user.password = newHashPass
            req.session.user.password = newHashPass
            await user.save()

            req.flash('message', "Berhasil ubah password Akun Anda!")
            return res.redirect('/')

        } catch(e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    changePassword()

}



exports.postDeleteAccountConfirm = (req, res, next) => {
    const token = req.body.tokenHapusAkun

    const invalidRender = (message) => {
        res.status(httpStatus['400_bad_request']).render('account/deleteAccount', {
            pageTitle: 'Hapus Account',
            message: message,
            user: {
                nama: req.user.nama
            }
        })
    }

    async function deleteAccountConfirm(){
        try{
            if(token !== req.user.token.deleteAccount) {
                console.log(token)
                console.log(req.user.token.deleteAccount)
                return invalidRender('Gagal, Kode tidak valid!')
            }

            if(Date.now() > req.user.token.deleteAccountExp){
                console.log(Date.now())
                console.log(req.user.token.deleteAccountExp)
                return invalidRender('Gagal, Token sudah kedaluarsa, silahkan minta token lagi!')
            }
            const user = await User.findOneAndDelete({'token.deleteAccount' : token})
            if(!user) {
                return invalidRender('Gagal, Token salah!')
            }

            req.session.destroy()
            return res.render('account/deleteAccountSuccess', {
                pageTitle: 'Berhasil Hapus Akun',
                email: user.email
            })

        } catch(e) {
            console.log(e)
            return next(new Error(e))
        }
    }
    deleteAccountConfirm()

}














