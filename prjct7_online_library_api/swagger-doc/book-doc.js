//* ------------------------------ BOOK DOCUMENTATION ------------------------------ *//

//*? -------------------------------------------- GET --------------------------------------------


//*! GET ALL BOOK DATA
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get data books
 *     tags: [Book]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 5 Document
 *       - name: search
 *         in: query
 *         description: Search feature based on searching by book name
 *
 *     responses:
 *       '200':
 *         description: Success Get Books Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Book Data
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     books:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 profile:
 *                                   type: string
 *                           publisher:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           like:
 *                             type: integer
 *                           summary:
 *                             type: string
 *                           image_url:
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





//*! GET DETAIL ONE HISTORY REVIEWS DATA WITH ALL COMMENT IF ANY
/**
 * @swagger
 * /books/{id_buku}/reviews/{id_history}:
 *   get:
 *     summary: Get One Detail data book and with reviews book data and comment section data
 *     tags: [Book]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document Comment show on 1 Page, Default set to 10 Data per page
 *       - name: id_buku
 *         in: path
 *         required: true
 *         description: Book ID
 *       - name: id_history
 *         in: path
 *         required: true
 *         description: Book ID History with Reviews
 *
 *     responses:
 *       '200':
 *         description: Success Get Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Books Reviews
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     book_data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         summary:
 *                           type: string
 *                         year:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         image_url:
 *                           type: string
 *                         authors:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                         publisher:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     review:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           id_user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               username:
 *                                 type: string
 *                           page_finished:
 *                             type: integer
 *                           n_borrowed:
 *                             type: integer
 *                           finished:
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
 *                     comments:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *       '404':
 *         description: Data Not Found
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





//*! GET BOOK HISTORY WITH REVIEWS DATA
/**
 * @swagger
 * /books/{id_buku}/reviews:
 *   get:
 *     summary: Get data books and with reviews book data
 *     tags: [Book]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Show Page Number
 *       - name: size
 *         in: query
 *         description: How Much Document on 1 Page, Default set to 5 Data per page
 *       - name: id_buku
 *         in: path
 *         required: true
 *         description: Book ID
 *
 *     responses:
 *       '200':
 *         description: Success Get Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Books Reviews
 *                 data:
 *                   type: object
 *                   properties:
 *                     total_data:
 *                       type: integer
 *                     current_page:
 *                       type: integer
 *                     per_page:
 *                       type: integer
 *                     book_data:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                         title:
 *                           type: string
 *                         summary:
 *                           type: string
 *                         year:
 *                           type: integer
 *                         page:
 *                           type: integer
 *                         image_url:
 *                           type: string
 *                         authors:
 *                           type: array
 *                           items:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                         publisher:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                         category:
 *                           type: object
 *                           properties:
 *                             _id:
 *                               type: string
 *                             name:
 *                               type: string
 *                     reviews:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           _id:
 *                             type: string
 *                           id_user:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               username:
 *                                 type: string
 *                           page_finished:
 *                             type: integer
 *                           n_borrowed:
 *                             type: integer
 *                           finished:
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
 *       '404':
 *         description: Data Not Found
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





//*! GET ONE BOOK BORROWING DATA
/**
 * @swagger
 * /books/{id_buku}/{list_check}:
 *   get:
 *     summary: Get one detail book with Borrows/ Queue data if path parameters is Defined *admin only
 *     tags: [Book]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_buku
 *         in: path
 *         required: true
 *         description: Book ID
 *       - name: list_check
 *         in: path
 *         description: the value must be either borrows/queues if need to be fill
 *
 *     responses:
 *       '200_no_parameter':
 *         description: Get Book Data without borrows/ queues list data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Book Data
 *                 data:
 *                   type: object
 *                   properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 profile:
 *                                   type: string
 *                           publisher:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           like:
 *                             type: integer
 *                           summary:
 *                             type: string
 *                           image_url:
 *                             type: string
 *       '200_with_borrows':
 *         description: Get Book Data with borrows list data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Book Data
 *                 data:
 *                   type: object
 *                   properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 profile:
 *                                   type: string
 *                           publisher:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           like:
 *                             type: integer
 *                           summary:
 *                             type: string
 *                           image_url:
 *                             type: string
 *                           borrowers:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 date_in:
 *                                   type: string
 *                                 date_out:
 *                                   type: string
 *                                 read_page:
 *                                   type: integer
 *                                 id_user:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     username:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                     borrowing:
 *                                       type: array
 *                                       items:
 *                                         id_borrowing:
 *                                           type: string
 *       '200_with_queues':
 *         description: Get Book Data with queues list data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get Book Data
 *                 data:
 *                   type: object
 *                   properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 profile:
 *                                   type: string
 *                           publisher:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           like:
 *                             type: integer
 *                           summary:
 *                             type: string
 *                           image_url:
 *                             type: string
 *                           queue:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                 date_in:
 *                                   type: string
 *                                 id_user:
 *                                   type: object
 *                                   properties:
 *                                     _id:
 *                                       type: string
 *                                     username:
 *                                       type: string
 *                                     name:
 *                                       type: string
 *                                     queue:
 *                                       type: array
 *                                       items:
 *                                         id_queue:
 *                                           type: string
 *       '400':
 *         description: If Filled, Path Parameters must be either "borrows" or "queues"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: If Filled, Path Parameters must be either 'borrows' or 'queues'
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
 *       '404':
 *         description: Not Authorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Book Data not Found
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





//*! GET SPECIFIC ONE BOOK DATA WITH BOOK ID PARAMETER
/**
 * @swagger
 * /books/{id_buku}:
 *   get:
 *     summary: Get one detail book data
 *     tags: [Book]
 *     parameters:
 *       - name: id_buku
 *         in: path
 *         required: true
 *         description: Book ID
 *
 *     responses:
 *       '200':
 *         description: Success Get Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Get One Detail Book Data
 *                 data:
 *                   type: object
 *                   properties:
 *                           _id:
 *                             type: string
 *                           title:
 *                             type: string
 *                           authors:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 _id:
 *                                   type: string
 *                                 name:
 *                                   type: string
 *                                 profile:
 *                                   type: string
 *                           publisher:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           category:
 *                             type: object
 *                             properties:
 *                               _id:
 *                                 type: string
 *                               name:
 *                                 type: string
 *                           year:
 *                             type: integer
 *                           page:
 *                             type: integer
 *                           like:
 *                             type: integer
 *                           summary:
 *                             type: string
 *                           image_url:
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





//*? -------------------------------------------- POST --------------------------------------------


//*! POST NEW BOOK DATA
/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add new Book Data
 *     tags: [Book]
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
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               year:
 *                 type: integer
 *               page:
 *                 type: integer
 *               image_url:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   author_id:
 *                     type: string
 *               publisher_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Success Add new Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Add new Book Data
 *       '400':
 *         description: Input Data Error
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





//*! POST NEW COMMENT DATA ON REVIEW BOOKS
/**
 * @swagger
 * /books/{id_buku}/reviews/{id_history}/comments:
 *   post:
 *     summary: Add new Comment on Book Review
 *     tags: [Book - Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_buku
 *         in: path
 *         description: Book ID
 *       - name: id_history
 *         in: path
 *         description: History ID who Have User Reviews Inside It
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Success Add new Comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Add new Comment
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





//*? -------------------------------------------- PATCH --------------------------------------------


//*! EDIT BOOK DATA
/**
 * @swagger
 * /books:
 *   patch:
 *     summary: Edit Book Data
 *     tags: [Book]
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
 *               id_buku:
 *                 type: string
 *               title:
 *                 type: string
 *               summary:
 *                 type: string
 *               year:
 *                 type: integer
 *               page:
 *                 type: integer
 *               image_url:
 *                 type: string
 *               authors:
 *                 type: array
 *                 items:
 *                   author_id:
 *                     type: string
 *               publisher_id:
 *                 type: string
 *               category_id:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success Edit Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Edit Book Data
 *       '400':
 *         description: Input Data Error
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
 *       '404':
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Book Data Not Found
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





//*? -------------------------------------------- DELETE--------------------------------------------


//*! DELETE BOOK DATA
/**
 * @swagger
 * /books:
 *   delete:
 *     summary: Delete Book Data
 *     tags: [Book]
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
 *               id_buku:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Delete Book Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Book Data
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
 *       '404':
 *         description: Data not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Book Data Not Found
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





//*! DELETE COMMENT DATA
/**
 * @swagger
 * /books/{id_buku}/reviews/{id_history}/comments:
 *   delete:
 *     summary: Delete User Comment on Book Review
 *     tags: [Book - Comments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id_buku
 *         in: path
 *         description: Book ID
 *       - name: id_history
 *         in: path
 *         description: History ID who Have User Reviews Inside It
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_comment:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Success Delete Comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Delete Comment
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