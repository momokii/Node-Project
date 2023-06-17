const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        prov: {
            type: String,
            required: true
        },
        kota: {
            type: String,
            required: true
        },
        kec: {
            type: String,
            required: true
        }
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
        forgetPass: {
            type: String,
            default: null
        }
    },
    queue: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Queue'
    }],
    borrowing: [{
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Borrowing"
    }]
}, {
    timestamps: true
})

userSchema.pre('save', function(next) {
    if(this.role !== 'user'){
        this.queue = undefined
        this.borrowing = undefined
    }
    next()
})

module.exports = mongoose.model('User', userSchema)