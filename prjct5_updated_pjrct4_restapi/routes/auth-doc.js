// * -------------------------------- Route Doc -------------------------------- * //

// * --------------- GET GET GET

// * /auth/
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


// * /auth/user
/**
 * @swagger
 * /auth/user:
 *   get:
 *     summary: check login with auth header
 *     tags: [Connection Check]
 *     security:
 *       - bearerAuth : []
 *
 *     responses:
 *       '200':
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User Login
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     name:
 *                       type: string
 *                     role:
 *                       type: string
 *         description: Success Login
 *       '500':
 *         description: Internal server error
 */




// * --------------- POST POST POST

// * /auth/login
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: login user dengan email dan password akan return access token dan refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: username1@gmail.com
 *               password:
 *                 type: string
 *                 example: Password1
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
 *                 email:
 *                   type: string
 *       '401':
 *         description: email/ Password Salah!
 *       '500':
 *         description: Internal Error
 *
 */




// * /auth/refresh
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
 *                 email:
 *                   type: string
 *
 *       '401':
 *         description: Refresh Token tidak Valid!
 *       '500':
 *         description: Internal Error
 */




//* /auth/signup
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
 *               email:
 *                 type: string
 *                 example: username1@gmail.com
 *               password:
 *                 type: string
 *                 example: Password1
 *               password_konfir:
 *                 type: string
 *                 example: Password1
 *               name:
 *                 type: string
 *                 example: nama saya
 *               role:
 *                 type: string
 *                 example: pedagang
 *
 *     responses:
 *       '201':
 *         description: success Created new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User Success Created
 *                 User:
 *                   type: object
 *                   properties:
 *                     userId:
 *                       type: string
 *                     email:
 *                       type: string
 *
 *       '422':
 *         description: gagal, data input tidak sesuai
 *       '500':
 *         description: internal server error
 */




//* /auth/logout
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
 *                 email:
 *                   type: string
 *       '401':
 *         description: Auth Error, failed logout
 *       '500':
 *         description: internal server error
 *
 */