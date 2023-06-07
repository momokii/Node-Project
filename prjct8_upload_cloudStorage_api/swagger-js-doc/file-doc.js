// * -------------------------------- FILE DOC -------------------------------- * //

// * GET File URI
// * GET /files/
/**
 * @swagger
 * /files/:
 *   get:
 *     summary: Get file public URL from Cloud Storage
 *     tags: [Cloud Storage]
 *     parameters:
 *       - name: file_path
 *         in: query
 *         description: Folder/ File path where to get all file inside it, example -> "check/sini" or "check/sini/namefile.jpg"
 *
 *     responses:
 *       '200':
 *         description: Get File Data from Cloud Storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get File Data from Cloud Storage
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     file_data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           file_path:
 *                             type: string
 *                           file_type:
 *                             type: string
 *                           download_url:
 *                             type: string
 *                           public_url:
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
 */





// * POST Files upload to cloud storage
// * POST /files/
/**
 * @swagger
 * /files/:
 *   post:
 *     summary: Post file upload to Cloud Storage
 *     tags: [Cloud Storage]
 *     parameters:
 *       - name: random_filename
 *         in: query
 *         description: fill with "true" if need the file uploaded will get random name
 *
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               path:
 *                 type: string
 *                 description: Path file need to save, ex -> "book/photo"
 *               name:
 *                 type: string
 *                 description: Fill with custom name when need it, when the field is filled, the random_filename query will not be active even if it is set to "true"
 *               file:
 *                 type: file
 *     responses:
 *       '200_with_file':
 *         description: Success Upload to Cloud Storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Upload to Cloud Storage
 *                 data:
 *                   type: object
 *                   properties:
 *                     public_url:
 *                       type: string
 *       '200_without_file':
 *         description: File is Empty
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: File is Empty
 *       '413':
 *         description: File too Large
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: File too Large, Max Size is 2MB
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
 */





// * DELETE file on cloud storage
// * DELETE /files/
/**
 * @swagger
 * /files/:
 *   delete:
 *     summary: Delete one specific file on Cloud Storage
 *     tags: [Cloud Storage]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file_path:
 *                 type: string
 *
 *     responses:
 *       '200_success_delete_file':
 *         description: Success Delete File from Cloud Storage
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete File from Cloud Storage
 *       '200_file_not_found':
 *         description: File not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: File not Found
 *       '200_multiple_file_found':
 *         description: Multiple files found. Please provide a more specific file_path
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Multiple files found. Please provide a more specific file_path
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
 */