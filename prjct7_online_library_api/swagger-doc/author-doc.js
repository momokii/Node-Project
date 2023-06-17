//* ------------------------------ AUTHOR DOCUMENTATION ------------------------------ *//

/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get data authors
 *     tags: [Authors]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 10 Documents
 *
 *     responses:
 *       '200':
 *         description: Success Get Authors Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Authors Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     authors:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           name:
 *                             type: string
 *                           profile:
 *                             type: string
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
 * /authors:
 *   post:
 *     summary: Add new Author Data
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               profile:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Success Create new Author Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Create new Author Data
 *       '401':
 *         description: User not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
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
 *                   example: true
 *                 message:
 *                   type: string
 *
 *
 */





/**
 * @swagger
 * /authors:
 *   put:
 *     summary: Edit Author Data
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_author:
 *                 type: string
 *               new_name:
 *                 type: string
 *               new_profile:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Edit Author Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Edit Author Data
 *       '400':
 *         description: Edit Failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
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
 *                   example: Not Authorized
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
 * /authors:
 *   delete:
 *     summary: Success Delete Author Data
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_author:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Delete Author Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Author Data
 *       '401':
 *         description: User Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
 *       '404':
 *         description: Data not Found!
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Author Data not Found!
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