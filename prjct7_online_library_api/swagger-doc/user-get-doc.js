//* ------------------------------ USER GET DOCUMENTATION ------------------------------ *//

//* GT USER PERSONAL DATA
/**
 * @swagger
 * /users/{username}:
 *   get:
 *     summary: Get data Users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *
 *     responses:
 *       '200':
 *         description: Success Get User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Detail Users Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     email:
 *                       type: string
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     address:
 *                       type: object
 *                       properties:
 *                         prov:
 *                           type: string
 *                         kota:
 *                           type: string
 *                         kec:
 *                           type: string
 *                     role:
 *                       type: string
 *                     queue:
 *                       type: array
 *                       items:
 *                         s:
 *                     borrowing:
 *                       type: array
 *                       items:
 *                         s:
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER BORROW BOOK LIST DATA
/**
 * @swagger
 * /users/{username}/borrows:
 *   get:
 *     summary: Get user borrowing book data
 *     tags: [User - Borrow]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *
 *     responses:
 *       '200':
 *         description: Success Get User Borrowing Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Get User Borrowing Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     borrowing:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           read_page:
 *                             type: integer
 *                           date_in:
 *                             type: string
 *                           date_out:
 *                             type: string
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               year:
 *                                 type: integer
 *                               page:
 *                                 type: integer
 *                               summary:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER ONE QUEUE BOOK DATA
/**
 * @swagger
 * /users/{username}/queues/{id_queue}:
 *   get:
 *     summary: Get user queues detail data with no queue and length of queue
 *     tags: [User - Queue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: id_queue
 *         in: path
 *         required: true
 *         description: Queue id
 *
 *     responses:
 *       '200':
 *         description: Success Get User queues Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get one detail queue data
 *                 data:
 *                   type: object
 *                   properties:
 *                     username:
 *                       type: string
 *                     name:
 *                       type: string
 *                     queue_data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         queue_length:
 *                           type: integer
 *                         queue_no:
 *                           type: integer
 *                         date_in:
 *                           type: date
 *                     book_data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         summary:
 *                           type: string
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   type: string
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





//* GET USER QUEUE BOOK LIST DATA
/**
 * @swagger
 * /users/{username}/queues:
 *   get:
 *     summary: Get user queues list data
 *     tags: [User - Queue]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *
 *     responses:
 *       '200':
 *         description: Success Get User queues Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get User queue list Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     queue:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           date_in:
 *                             type: string
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               year:
 *                                 type: integer
 *                               page:
 *                                 type: integer
 *                               summary:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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




//* GET USER WISHLIST DATA
/**
 * @swagger
 * /users/{username}/wishlists:
 *   get:
 *     summary: Get data Users Wishlists Data
 *     tags: [User - Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 5 document
 *
 *     responses:
 *       '200':
 *         description: Get User Wishlists Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get User Wishlists Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     wishlists:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           summary:
 *                             type: string
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER LIKED DATA LIST
/**
 * @swagger
 * /users/{username}/liked:
 *   get:
 *     summary: Get data Users Liked Book Data
 *     tags: [User - History/Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 10 document
 *
 *     responses:
 *       '200':
 *         description: Get Users Liked Book Data List
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Users Liked Book
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     liked:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               year:
 *                                 type: integer
 *                               page:
 *                                 type: integer
 *                               like:
 *                                 type: string
 *                               summary:
 *                                 type: string
 *                               image_url:
 *                                 type: string
 *
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER COMMENT DATA LIST
/**
 * @swagger
 * /users/{username}/comments:
 *   get:
 *     summary: Get data Users Comments Data
 *     tags: [User - History/Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 10 document
 *
 *     responses:
 *       '200':
 *         description: Get Users Comments Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Users Comments Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           id_history:
 *                             type: string
 *                           data:
 *                             type: string
 *                           createdAt:
 *                             type: string
 *
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER HISTORY BOOK BORROWING DATA
/**
 * @swagger
 * /users/{username}/history/{id_history}:
 *   get:
 *     summary: Get One data Users History Borrowing
 *     tags: [User - History/Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: id_history
 *         in: path
 *         required: true
 *         description: ID History to see the detail
 *
 *     responses:
 *       '200':
 *         description: Get User Book Borrowing History
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get User History Borrowing Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     history_data:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           page_finished:
 *                             type: integer
 *                           total_page:
 *                             type: integer
 *                           n_borrowed:
 *                             type: integer
 *                           finished:
 *                             type: boolean
 *                           like:
 *                             type: boolean
 *                           review:
 *                             type: object
 *                             properties:
 *                               data:
 *                                 type: string
 *                               createdAt:
 *                                 type: string
 *                               updatedAt:
 *                                 type: string
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               summary:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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





//* GET USER HISTORY BOOK BORROWING DATA
/**
 * @swagger
 * /users/{username}/history:
 *   get:
 *     summary: Get data Users
 *     tags: [User - History/Review]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: username
 *         in: path
 *         required: true
 *         description: User username data
 *       - name: reviews
 *         in: query
 *         description: Fill with "true" if need just get history with reviews data
 *       - name: liked
 *         in: query
 *         description: Fill with "true" if need just get history/book data user liked
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 5 document
 *
 *     responses:
 *       '200_without_query':
 *         description: Get User Book Borrowing History
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get User History Borrowing Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     history_data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           page_finished:
 *                             type: integer
 *                           total_page:
 *                             type: integer
 *                           n_borrowed:
 *                             type: integer
 *                           finished:
 *                             type: boolean
 *                           like:
 *                             type: boolean
 *                           have_review:
 *                             type: boolean
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               summary:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *       '200_with_query_reviews':
 *         description: Get User Book Borrowing History
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get User History Borrowing Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     history_data:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           page_finished:
 *                             type: integer
 *                           total_page:
 *                             type: integer
 *                           n_borrowed:
 *                             type: integer
 *                           finished:
 *                             type: boolean
 *                           like:
 *                             type: boolean
 *                           review:
 *                             type: object
 *                             properties:
 *                               data:
 *                                 type: string
 *                               createdAt:
 *                                 type: string
 *                               updatedAt:
 *                                 type: string
 *                           id_buku:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               title:
 *                                 type: string
 *                               summary:
 *                                 type: string
 *                               authors:
 *                                 type: array
 *                                 items:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                               publisher:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
 *                               category:
 *                                 type: object
 *                                 properties:
 *                                   _id:
 *                                     type: string
 *                                   name:
 *                                     type: string
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
 *       '404':
 *         description: Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Username Data not Found
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