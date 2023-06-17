const mongoose = require('mongoose')
const Schema = mongoose.Schema


const borrowingSchema = new Schema({
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
    read_page:{
      type: Number,
      default: 0
    },
    date_in: {
        type: Date,
        required: true
    },
    date_out: {
        type: Date,
        required: true
    }
}, {
    timestamps: true
})

borrowingSchema.virtual('buku').get(function() {
    return this.id_buku;
})

module.exports = mongoose.model('Borrowing', borrowingSchema)