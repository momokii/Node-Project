// * -------------------------------- Route Doc -------------------------------- * //

// * --------------- GET GET GET

// * --------------- POST POST POST

// * --------------- PATCH PATCH PATCH

//* PATCH /user/password
/**
 * @swagger
 * /user/password:
 *   patch:
 *     summary: change user password with auth header
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password_lama:
 *                 type: string
 *               password_baru:
 *                 type: string
 *               password_konfir:
 *                 tyoe: string
 *
 *     responses:
 *       '200':
 *         description: Sukses ganti password user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: User success change password
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     id:
 *                       type: string
 *       '401':
 *         description: gagal autentikasi dan ganti password gagal
 *       '500':
 *         description: internal error
 *
 */


// * --------------- DELETE DELETE DDELETE

// * delete 2 flow endpoint

// * GET /user/delete
/**
 * @swagger
 * /user/delete:
 *   get:
 *     summary: get token for delete account
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: get delete token for delete user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleteUserToken:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 email:
 *                   type: string
 *
 *       '401':
 *         description: not authorized user
 *       '500':
 *         description: internal server error
 *
 */

// * DELETE /user/delete
/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: verifikasi delete token and delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               deleteToken:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: success delete user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Success delete user
 *                 user_deleted:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       '401':
 *         description: not authorized user
 *       '500':
 *         description: internal server error
 *
 */


// * delete 1 flow endpoint

// * DELETE /user/delete2
/**
 * @swagger
 * /user/delete2:
 *   delete:
 *     summary: verifikasi delete token and delete user
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       '200':
 *         description: success delete user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Success delete user
 *                 user_deleted:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     email:
 *                       type: string
 *       '401':
 *         description: not authorized user
 *       '500':
 *         description: internal server error
 *
 */





//* GET /user/forget_password
/**
 * @swagger
 * /user/forget_password:
 *   post:
 *     summary: get token for auth for change password if user forget password
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 example: username1@gmail.com
 *
 *     responses:
 *       '200':
 *         description: get new token for auth forget password
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Success send token to email
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     id:
 *                       type: string
 *
 *       '401':
 *         description: auth email failed, failed get token
 *       '500':
 *         description: internal server error
 *
 */





//* PATCH /user/forget_password
/**
 * @swagger
 * /user/forget_password:
 *   patch:
 *     summary: change password from forget password with token auth
 *     tags: [User]
 *     requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                email:
 *                  type: string
 *                change_password_token:
 *                  type: string
 *                password:
 *                  type: string
 *                password_konfir:
 *                  type: string
 *
 *     responses:
 *       '200':
 *         description: user success set new password from forget password endpoint
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   example: Success change password from forget password
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                     id:
 *                       type: string
 *       '401':
 *         description: token not valid
 *       '406':
 *         description: input password not valid
 *       '500':
 *         description: internal server error
 *
 */