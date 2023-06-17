//* ------------------------------ LOCATION DOCUMENTATION ------------------------------ *//

/**
 * @swagger
 * /provinsi:
 *   get:
 *     summary: Get all provinsi data with code
 *     tags: [Location]
 *
 *     responses:
 *       '200':
 *         description: Success Get Provinsi Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Provinsi Data
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         id:
 *                           type: string
 *                         nama:
 *                           type: string
 *
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





/**
 * @swagger
 * /provinsi/{id_provinsi}:
 *   get:
 *     summary: Get Kota Data Depends on Provinsi Code
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id_provinsi
 *         required: true
 *         description: Provinsi Code to Get all Kota within the Provinsi
 *
 *     responses:
 *       '200':
 *         description: Success Get Kota Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Kota Data
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         id:
 *                           type: string
 *                         nama:
 *                           type: string
 *
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





/**
 * @swagger
 * /kota/{id_kota}:
 *   get:
 *     summary: Get Kecamatan Data Depends on Kota Code
 *     tags: [Location]
 *     parameters:
 *       - in: path
 *         name: id_kota
 *         required: true
 *         description: Kota Code to Get all Kecamatan within the Kota
 *
 *     responses:
 *       '200':
 *         description: Success Get Kecamatan Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Kecamatan Data
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                         id:
 *                           type: string
 *                         nama:
 *                           type: string
 *
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