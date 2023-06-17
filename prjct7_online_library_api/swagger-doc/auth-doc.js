// *! TEMPLATES DOC
// /**
//  * @swagger
//  * /:
//  *   post:
//  *     summary: a
//  *     tags: []
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             type: object
//  *             properties:
//  *
//  *     responses:
//  *       '':
//  *         description:
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 errors:
//  *                   example:
//  *                 message:
//  *                   example:
//  *       '500':
//  *         description: Internal Server Error
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 errors:
//  *                   example: true
//  *                 message:
//  *                   type: string
//  *
//  *
//  */


//* ------------------------------ AUTH DOCUMENTATION ------------------------------ *//

// *! Connection Check
/**
 * @swagger
 * /token-check:
 *   get:
 *     summary: check token access
 *     tags: [Connection Check]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: success connect with jwt
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Connect and JWT Active
 *                 data:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     role:
 *                       type: string
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */

/**
 * @swagger
 * /check:
 *   get:
 *     summary: check connection
 *     tags: [Connection Check]
 *
 *     responses:
 *       '200':
 *         description: success connect
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Connect
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */

// *! -----------------------------





// * /signup
/**
 * @swagger
 * /signup:
 *   post:
 *     summary: user signup created new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 example: username1@gmail.com
 *               username:
 *                 example: username1
 *               name:
 *                 example: nama saya ini
 *               password:
 *                 example: Password1
 *               password_konfir:
 *                 example: Password1
 *               provinsi:
 *                 example: Jawa Tengah
 *               kota:
 *                 example: Banjarnegara
 *               kecamatan:
 *                 example: Bawang
 *               role:
 *                 example: admin/user
 *
 *     responses:
 *       '201':
 *         description: success create new user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Created New User
 *       '400':
 *         description: SignUp Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: SignUp Failed
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 *
 */


// *! LOGIN
/**
 * @swagger
 * /login:
 *   post:
 *     summary: login user with email, password to get new access and refresh token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 example: username1@gmail.com
 *               password:
 *                 example: Password1
 *
 *     responses:
 *       '200':
 *         description: Success login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Login
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                     refresh_token:
 *                       type: string
 *                     auth_type:
 *                       example: Bearer
 *                     expires_in:
 *                       example: 1h
 *       '400':
 *         description: Failed Login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Wrong Email / Password
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 */





// *! LOG-OUT
/**
 * @swagger
 * /logout:
 *   post:
 *     summary: user logout and make both access and refresh account not valid
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: Success Logout
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Logout
 *       '401':
 *         description: Not Authorized Access
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Not Authorized
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   type: string
 *
 */





/**
 * @swagger
 * /refresh:
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
 *         description: get new access token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Success Get New Access Token
 *                 data:
 *                   type: object
 *                   properties:
 *                     access_token:
 *                       type: string
 *                     token_type:
 *                       example: Bearer
 *                     expires_in:
 *                       example: 1h
 *       '400':
 *         description: failed get new access-token, refresh-token not valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Refresh Token Not Valid
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 */





// *! GET FORGET PASS TOKEN
/**
 * @swagger
 * /forget-password:
 *   post:
 *     summary: get forget password token with email input
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
 *
 *     responses:
 *       '200':
 *         description: Success Get New Forget Token Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Get Forget Password Token
 *                 data:
 *                   type: object
 *                   properties:
 *                     forget_password_token:
 *                       type: string
 *                     expires_in:
 *                       example: 15m
 *       '400':
 *         description: Account Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Account With Input Not Found!
 *       '406':
 *         description: Input Type Wrong
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Use the Right Email Format!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */





// *! patch FORGET PASSWORD -> change password with token from forget password
/**
 * @swagger
 * /forget-password:
 *   patch:
 *     summary: change password with token get from POST /forget-password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               password:
 *                 type: string
 *               password_konfir:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Change Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Set New Password From Forget Password
 *       '401':
 *         description: Token not Valid!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Token Not Valid!
 *       '406':
 *         description: Input Password Error!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Input Password Error!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */





// *! patch PASSWORD -> change password with auth header (login)
/**
 * @swagger
 * /password:
 *   patch:
 *     summary: change password with auth header (login)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *               password:
 *                 type: string
 *               password_konfir:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Change Password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Change Account Password
 *       '401':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *       '406':
 *         description: Input Password Error!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Input Password Error!
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *
 */