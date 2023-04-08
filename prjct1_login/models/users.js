const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        reset: { type: String, default: null },
        resetTokenInterval : {type: Date, default: null},
        deleteAccount: { type: String, default: null },
        deleteAccountInterval: { type: Date, default: null },
        deleteAccountExp : {type: Date, default: null}
    }
})


module.exports = mongoose.model('User', userSchema)