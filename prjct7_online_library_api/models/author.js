const mongoose = require('mongoose')
const Schema = mongoose.Schema


const authorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true,
        default: null
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Author', authorSchema)