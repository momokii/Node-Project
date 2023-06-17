const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    id_history: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'BookBorrowingHistory'
    },
    data: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

module.exports = mongoose.model('Comment', commentSchema)