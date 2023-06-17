const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: [{
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Author"
        }],
        validate: {
            validator: function(authors) {
                return authors.length > 0
            },
            message: "Must Be Contain At least 1 Authors"
        }
    },
    publisher: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Publisher"
    },
    category: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Category"
    },
    year: {
        type: Number,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    like: {
        type: Number,
        required: true,
        default: 0
    },
    summary: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
        default: null
    },
    borrowers: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Borrowing"
    }],
    queue: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Queue'
    }]
}, {
    timestamps: true
})


module.exports = mongoose.model('Book', bookSchema)