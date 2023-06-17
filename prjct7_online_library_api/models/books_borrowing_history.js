const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookBorrowingHistorySchema = new Schema({
    id_buku: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Book'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    page_finished: {
        type: Number,
        required: true,
        default: 0
    },
    total_page: {
        type: Number,
        required: true
    },
    n_borrowed: {
        type: Number,
        required: true,
        default: 1
    },
    finished: {
        type: Boolean,
        default: false
    },
    like: {
        type: Boolean,
        default: false
    },
    review: {
        data: {
            type: String,
            default: null
        },
        createdAt: {
            type: Date,
            default: null
        },
        updatedAt: {
            type: Date,
            default: null
        }
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('BookBorrowingHistory', bookBorrowingHistorySchema)