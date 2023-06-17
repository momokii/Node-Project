const mongoose = require('mongoose')
const Schema = mongoose.Schema

const wishlistSchema = new Schema({
    id_buku: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Book",
        alias: 'book_data'
    },
    id_user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
})

module.exports = mongoose.model('Wishlist', wishlistSchema)