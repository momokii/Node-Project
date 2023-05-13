// * ----------------------- DOKUMENTASI SWAGGER -----------------------------

// * ---- Swagger Schema
/**
 * @swagger
 * components:
 *   schemas:
 *       User:
 *           type: object
 *           required:
 *               - email
 *               - password
 *               - name
 *               - role
 *           description: Struktur dalam database penyimpanan data User
 *           properties:
 *               email:
 *                   type: string
 *                   description: email user untuk login
 *                   example: username@gmail.com
 *               password:
 *                   type: string
 *                   description: user password in hash mode
 *                   example: $2b$12$alQAnrk3uQoLbTm2Q02nV.vega4t4dC.UEEel7ibhP6ZthMZfikCq
 *               name:
 *                   type: string
 *                   description: user account name
 *                   example: joko susilo
 *               token:
 *                   type: object
 *                   description: token use for some auth things
 *                   properties:
 *                       refresh:
 *                          type: string
 *                          description: refresh token
 *                          example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXJuYW1lMUBnbWFpbC5jb20iLCJ1c2VySWQiOiI2NDVkMzU4Y2UwMzFhOWQwNTljMjE1ZWUiLCJpYXQiOjE2ODM4MzAxNjR9.pX58FZLu1vtM8PxIBOXxuPivVP7vcBOvHvO8pG18__c
 *                       auth:
 *                          type: string
 *                          description: auth token for auth confirmation
 *                          example: fe1b888bb3c1a10cc5a18d755311b717d3c896c5ce9778a933d3a7c2c63b9ba5
 *                       deleteAcc:
 *                          type: string
 *                          description: auth token for delete account/ user
 *                          example: b0a41838f75e85f3c3d65ebd
 *                       forgetPass:
 *                          type: string
 *                          description: auth token for forget password
 *                          example: n7a41838f75e8hd7k3djka6v
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

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Proses berhubungan dengan user
 */