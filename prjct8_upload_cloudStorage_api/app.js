// * --------------------- DEPENDENCIES ---------------------
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const swaggerUI = require('swagger-ui-express')
const swaggerJSDOC = require('swagger-jsdoc')

// * CONST
const PORT = process.env.PORT

// * ROUTING
const fileRoutes = require('./routes/file')

// * --------------------- APP ---------------------

const swaggertUIOptions = {
    definition : {
        openapi: '3.0.0',
        info: {
            title: "Cloud Storage API",
            version : "1.0.0",
            description: "API for managing File to Google Cloud Storage.<br><br>Available features:<br> <ul><li>Upload File - Upload file with some available configuration like use custom name, use random name, defined folder path upload</li> <li>Get File - Can specified folder/file path use query </li> <li>Delete data - Specified delete one data on Google Cloud Storage </li>  </ul>",
            contact: {
                name: 'Kelana Chandra Helyandika',
                email: 'kelana.helyandika@mhs.unsoed.ac.id',
                url: 'kelanach.cyclic.app/'
            }
        },
        servers : [
            {
                url: 'http://localhost:' + PORT ,
                description: "Local Development Server"
            }
        ]
    },
    apis: ['./swagger-js-doc/*.js']
}
const swaggerSpecs = swaggerJSDOC(swaggertUIOptions)

// * APP CONFIG
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : false}))
app.use(cors())
app.use(helmet({
    contentSecurityPolicy: false, // disable content security policy
    hidePoweredBy: true, // hide X-Powered-By header
    hsts: false, // { maxAge: 31536000, includeSubDomains: true }, // enable HSTS with maxAge 1 year and includeSubDomains
    noCache: true, // enable noCache header
    referrerPolicy: { policy: 'no-referrer' } // set referrer policy to no-referrer
}))

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
app.use('/files', fileRoutes)


app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    res.status(status).json({
        errors: true,
        message: message
    })
})


// * START SERVER
async function connect(){
    try{
        app.listen(PORT)
        console.log('Connected to PORT ' + PORT)
    } catch (e) {
        console.log(e)
    }
}
connect()