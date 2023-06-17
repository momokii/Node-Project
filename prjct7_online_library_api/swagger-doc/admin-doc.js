//* ------------------------------ PUBLISHER CONTROLLER ------------------------------ *//

/**
 * @swagger
 * /admin/users:
 *   get:
 *     summary: Get data Users
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 5 Document
 *
 *     responses:
 *       '200':
 *         description: Success Get Users Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Users Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     users:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           email:
 *                             type: string
 *                           username:
 *                             type: string
 *                           name:
 *                             type: string
 *                           address:
 *                             type: object
 *                             properties:
 *                               prov:
 *                                 type: string
 *                               kota:
 *                                 type: string
 *                               kec:
 *                                 type: string
 *                           queue:
 *                             type: array
 *                             items:
 *                           borrowing:
 *                             type: array
 *                             items:
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