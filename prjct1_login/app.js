//* Const
const DB_NAME = 'DB_NAME'
const MONGODB_URI = 'MONGODB_URI' + DB_NAME

//* import dependencies
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const csrf = require('csurf')
const session = require('express-session')
//* Express session with mongoDB connection
const MongoDBStore = require('connect-mongodb-session')(session)
//* monitor and logging
const expressStatusMonitor = require('express-status-monitor')
const morganMonitor = require('morgan')
//* rotasi logging module
const rotating_file_stream = require('rotating-file-stream')
const accessLogStream = rotating_file_stream.createStream('access.log', {
    interval: '1d',
    path: path.join(__dirname, 'logs')
})
//* rate limiter
const globalRateLimiter = require('./util/rateLimiter').globalLimiter

//* import Models
const User = require('./models/users')

//* import routes
const authRoutes = require('./routes/auth')
const accountRoutes = require('./routes/account')
const errors = require('./controllers/errors')


//* APP Config
const app = express()

const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'session',
    expires: 1000 * 60 * 60 * 6
})

app.set('view engine', 'ejs')
app.set('views', 'views')

//* Middleware Config App
app.use(bodyParser.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, 'public')));

app.use(globalRateLimiter)

app.use(expressStatusMonitor())
app.use(morganMonitor('combined', {stream : accessLogStream}))

app.use(session({
    secret: 'ini secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use(cookieParser());
app.use(csrf());

app.use(flash())

app.use((req, res, next) => {
    //* Set local data to all routes
    res.locals.isAuthenticated = req.session.isLoggedIn
    res.locals.csrfToken = req.csrfToken()
    next()
})

//* Session Check
app.use((req, res, next) => {
    if(req.session.isLoggedIn) {
        async function userCheck(){
            try {
                const user = await User.findById(req.session.user._id)
                if(!user) {
                    next()
                }
                req.user = user
                next()
            } catch (e) {
                next(new Error(e))
            }
        }
        userCheck()
    } else {
        next()
    }
})

app.use(authRoutes)
app.use(accountRoutes)
app.use(errors.error404)
app.use(errors.error500)


//* JALANKAN KONEKSI
async function server() {
    try {
        await mongoose.connect(MONGODB_URI)
        app.listen(3000)
        console.log('Conected to Server')
    } catch (e) {
        console.log(e)
    }
}
server()







