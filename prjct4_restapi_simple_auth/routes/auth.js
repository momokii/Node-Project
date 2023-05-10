const express = require('express')
const router = express.Router()

const { body } = require('express-validator')
const User = require('../models/users')

const authController = require('../controllers/authController')
const isAuth = require('../middleware/is-auth')


// * --------------------------- Swagger Configuration --------------------------- * //

// * ---- Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           required:
 *               - username
 *               - password
 *               - name
 *           properties:
 *               username:
 *                   type: string
 *                   description: username user untuk login
 *               password:
 *                   type: string
 *                   description: user password in hash mode
 *               name:
 *                   type: string
 *                   description: user account name
 *               refresh_token:
 *                   type: string
 *                   description: user refresh token used to get new access token
 *           example:
 *                username: username2
 *                name: joko susilo
 *                password: 965aa0236191e17027d575c0e5f33d44339364b355bcd33fdb80c5e33e0ac69d
 *                refresh_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InVzZXJuYW1lMiIsInVzZXJJZCI6IjY0NWEzYzNiYjRiNGNlNGUzMWQ0MWMwNCIsImlhdCI6MTY4MzY4OTgyNH0.EAIbaOQskEz8WjP35c3QXHth8QyXbL-ZOTWx-bhIZ_g
 *
 */


// * ---- Swagger Tags
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Proses autentikasi akun
 */

/**
 * @swagger
 * tags:
 *   name: Connection Check
 *   description: Endpoint to check Connecntion to server/ database
 */


// * --------------------------- Route --------------------------- * //

/**
 * @swagger
 * /auth/:
 *   get:
 *     summary: check connection
 *     tags: [Connection Check]
 *
 *     responses:
 *       '200':
 *         description: OK, Connection Success
 */
router.get('/', (req, res, next) => {
    res.status(200).json({
        message : "Success Connect"
    })
})



/**
 * @swagger
 * /auth/cek_login:
 *   get:
 *     summary: check login with auth header
 *     tags: [Connection Check]
 *     security:
 *       - bearerAuth : []
 *
 *     responses:
 *       '200':
 *         description: Success Login
 *       '500':
 *         description: Internal server error
 */
router.get('/cek_login', isAuth, async (req, res, next) => {
    try {
        res.status(200).json({
            message : 'Anda Login'
        })
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500
        }
        next(e)
    }
})



/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user dengan username dan password akan return access token dan refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: a JSON Array User login Information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 refreshToken:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *                   example: 3600
 *                 token_type:
 *                   example: Bearer
 *                 username:
 *                   type: string
 *       '401':
 *         description: Username/ Password Salah!
 *       '500':
 *         description: Internal Error
 *
 */
router.post('/login', authController.login)



/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: get new access token with refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refresh_token:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: a JSON Array User login Information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 accessToken:
 *                   type: string
 *                 expiresIn:
 *                   type: integer
 *                   example: 3600
 *                 token_type:
 *                   example: Bearer
 *                 username:
 *                   type: string
 *
 *       '401':
 *         description: Refresh Token tidak Valid!
 *       '500':
 *         description: Internal Error
 */
router.post('/refresh', authController.refreshToken)



/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: create new user account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: username1
 *               password:
 *                 type: string
 *                 example: Password1
 *               password_konfir:
 *                 type: string
 *                 example: Password1
 *               name:
 *                 type: string
 *                 example: nama saya
 *
 *     responses:
 *       '201':
 *         description: success Created new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                 username:
 *                   type: string
 *       '422':
 *         description: gagal, data input tidak sesuai
 *       '500':
 *         description: internal server error
 */
router.post('/signup', [
    body('username', 'Username minimal berisi 6 karakter dan berupa alphanumerik!')
        .isLength({ min : 6 })
        .isAlphanumeric()
        .custom((value, {req}) => {
            return (async () => {
                const user  = await User.findOne({ username : value })
                if (user) {
                    throw new Error("Username sudah digunakan, coba username lain!")
                }
            })()
        })
        .trim(),
    body('password', 'Password harus setidaknya mengandung 1 angka dan huruf Kapital')
        .isStrongPassword({
            minLength : 6,
            minUppercase: 1,
            minSymbols:0,
            minNumbers : 1
        }),
    body('password_konfir')
        .custom((value, {req}) => {
            if ( value !== req.body.password) {
                throw new Error('Password Konfirmasi tidak sesuai')
            }
            return true
        }),
    body('name')
        //.isAlphanumeric().withMessage("Nama harus berupa huruf/string!")
        .isLength({min : 4}).withMessage('Nama minimal mengandung 4 karakter')
        .trim()
        .not()
        .isEmpty()
],authController.signup)



/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user access
 *     security:
 *       - bearerAuth: []
 *     tags: [Auth]
 *
 *     responses:
 *       '202':
 *         description: success logout and delete refresh token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   example: log out
 *                 username:
 *                   type: string
 *       '401':
 *         description: not Authorized
 *       '500':
 *         description: internal server error
 *
 */
router.post('/logout', isAuth,  authController.logout)


module.exports = router