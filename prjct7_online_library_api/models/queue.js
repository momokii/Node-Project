const mongoose = require('mongoose')
const Schema = mongoose.Schema

const queueSchema = new Schema({
    id_user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    id_buku: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Book"
    },
    date_in: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})


module.exports = mongoose.model('Queue', queueSchema)