// * Module Import / Dependencis & Constant

require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const swaggerUI = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')

const MONGO_URI = process.env.MONGO_URI

// * routes
const authRoutes = require('./routes/auth')


// * ----------------------------- App Config ----------------------------- * /

const swaggerUIOptions = {
    definition: {
        openapi : "3.0.0",
        info : {
            title : "Spotify Auth Clone",
            version: "1.0.0",
            description : "Mencoba membuat sistem autentikasi dengan mencontoh sistem Oauth2 Spoitfy API"
        },
        servers: [
            {
                url: '{protocol}://localhost:' + process.env.PORT,
                variables: {
                    protocol : {
                        enum : [
                            "http", "https"
                        ]
                    }
                }
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        }
    },
    apis: ["./routes/*.js"]
};
const specs = swaggerJsDoc(swaggerUIOptions)


const app = express()

app.use(bodyParser.json()) // * JSON Input needed
app.use(cors())


app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs))
app.use('/auth', authRoutes)


// * Global error handling
app.use((error, req, res, next) => {
    console.log(error)
    const status = error.statusCode || 500
    const message = error.message
    const data = error.data
    res.status(status).json({
        message : message,
        data : data
    })
})




// * Start Server
async function connectServer() {
    try {
        await mongoose.connect(MONGO_URI)
        app.listen(process.env.PORT)
        console.log('Connected to port ' + process.env.PORT)
    } catch (e) {
        console.log(e)
    }

}
connectServer()
