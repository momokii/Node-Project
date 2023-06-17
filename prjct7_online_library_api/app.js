// * ----------------------------- Module Dependencies
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const helmet = require('helmet')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDoc = require('swagger-jsdoc')
const expressMonitor = require('express-status-monitor')

// * --- CONST
const PORT = process.env.PORT

// * --- ROUTES
const authRoutes = require('./routes/auth')
const publisherRoutes = require('./routes/publishers')
const authorRoutes = require('./routes/authors')
const categoryRoutes = require('./routes/category')
const adminRoutes = require('./routes/admin')
const locationRoutes = require('./routes/location')
const booksRoutes = require('./routes/books')
const userGetRoutes = require('./routes/user-get')
const userNonGetRoutes = require('./routes/user-non-get')

// * ----------------------------- App


// * -- SWAGGER CONFIG
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Online Library API',
            version: '1.0.0',
            description: 'API documentation for illustrating the flow of using an online library, including the book borrowing process, book queueing, and related processes, <b>based on Node.js and using MongoDB as its database</b>. <br><br>To access the endpoints that require authorization, please set up authentication first using bearerAuth with an access token in the form of a JWT obtained from the /login endpoint and use /refresh to obtain a new access token by using the refresh token obtained from the /login process. <br><br>This API has two user roles with different scopes of use and structures to accommodate specific <needs></needs>: <ul> <li><b>Admin</b> - The admin can perform CRUD operations for existing book data and related properties. They can view "non-credential" data of users with the "user" role, as well as user history such as book borrowing.</li> <li><b>User</b> - The "user" role can borrow books, join the book queue, and perform related actions such as writing reviews or commenting on other users\' reviews</li> </ul> Let\'s Connect: <ul> <li><a href="https://github.com/momokii" target="_blank">GitHub</a></li> <li><a href="https://medium.com/@kelanach" target="_blank">Medium</a></li> <li><a href="https://www.linkedin.com/in/kelanach/" target="_blank">LinkedIn</a></li> </ul>',
            contact: {
                name: 'Kelana Chandra Helyandika',
                url: 'https://kelanach.cyclic.app/',
                email: 'kelanachandra7@gmail.com'
            },
        },
        // servers: [
        //     {
        //         url: '{protocol}://localhost:' + PORT,
        //         variables: {
        //             protocol: {
        //                 enum: ['https', 'http']
        //             }
        //         }
        //     }
        // ],
        servers: [
            {
                url: 'http://localhost:' + PORT,
                description: 'Local Development Server'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    apis: ['./swagger-doc/*.js']
}
const swaggerSpecs = swaggerJSDoc(swaggerOptions)


// * --- APP CONFIG
const app = express()

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended: false})) //* jika akan gunakan multipart/form-data
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false, // disable content security policy
    hidePoweredBy: true, // hide X-Powered-By header
    hsts: false, // { maxAge: 31536000, includeSubDomains: true }, // enable HSTS with maxAge 1 year and includeSubDomains
    noCache: true, // enable noCache header
    referrerPolicy: { policy: 'no-referrer' } // set referrer policy to no-referrer
}) )

app.use(expressMonitor())


// * -- routes setting

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))

app.use(authRoutes)
app.use('/publishers', publisherRoutes)
app.use('/authors', authorRoutes)
app.use('/categories', categoryRoutes)
app.use('/admin', adminRoutes)
app.use('/books', booksRoutes)
app.use('/users', userGetRoutes)
app.use('/users', userNonGetRoutes)
app.use(locationRoutes)

// * - global error handling
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        errors: true,
        message: message,
        data: data
    })
})


// * ----------------------------- App Connect
async function connectServer() {
    try{
        await mongoose.connect(process.env.MONGO_URI)
        app.listen(PORT)
        console.log('Connected to port ' + PORT)
    } catch(e) {
        console.log(e)
    }
}
connectServer()