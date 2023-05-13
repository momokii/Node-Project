const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email : {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    token: {
        refresh : {
            type: String,
            default: null
        },
        auth: {
            type: String,
            default: null
        },
        deleteAcc: {
            type: String,
            default: null
        },
        forgetPass: {
            type: String,
            default: null
        }
    }
})

module.exports = mongoose.model("User", userSchema)