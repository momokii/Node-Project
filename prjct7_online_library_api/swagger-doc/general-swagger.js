// * -------- -------- -------- -------- SCHEMAS DOCUMENT -------- -------- -------- -------- * //

// * AUTHOR
/**
 * @swagger
 * components:
 *   schemas:
 *     Authors:
 *       type: object
 *       required:
 *         - name
 *         - profile
 *       description: The document structure of the authors collection in the database
 *       properties:
 *         name:
 *           type: string
 *           description: author name
 *         profile:
 *           type: string
 *           description: author summary or short description
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */





// * BOOK BORROWING
/**
 * @swagger
 *   components:
 *     schemas:
 *       Borrowing Book:
 *         type: object
 *         required:
 *           - id_buku
 *           - id_user
 *         description: The document structure of the borrowings collection in the database
 *         properties:
 *           id_buku:
 *             type: objectId
 *             description: Book id from book document on books collection
 *           id_user:
 *             type: objectId
 *             description: User id from user document on users collection
 *           read_page:
 *             type: integer
 *             description: The last page read by the user
 *           date_in:
 *             type: date
 *             description: date user borrow the book
 *           date_out:
 *             type: date
 *             description: Deadline date user must return the book to system
 *           createdAt:
 *             type: date
 *           updatedAt:
 *             type: date
 */





// * BOOK
/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - authors
 *         - publisher
 *         - category
 *         - year
 *         - page
 *         - summary
 *       description: The document structure of the books collection in the database
 *       properties:
 *         title:
 *           type: string
 *           description: The book title
 *         authors:
 *           type: array
 *           description: The authors id with ObjectId format from authors collection, one book can have more than 1 authors
 *           items:
 *             type: ObjectId
 *         publisher:
 *           type: ObjectId
 *           description: The publisher id with ObjectId format from publishers collection
 *         category:
 *           type: ObjectId
 *           description: The category id with ObjectId format from categories collection
 *         year:
 *           type: date - year
 *           description: Year book released
 *         page:
 *           type: integer
 *           description: The total number of pages in the book
 *         like:
 *           type: integer
 *           description: The total like from user in the book
 *         summary:
 *           type: string
 *           description: description or summary about the book content
 *         image_url:
 *           type: string
 *           description: url link for book image
 *         borrowers:
 *           type: array
 *           description: The borrowing id with ObjectId format from borrowings collection, one book can have more than 1 borrowers and with some limit
 *           items:
 *             type: ObjectId
 *         queue:
 *           type: array
 *           description: The queue id with ObjectId format from queues collection, one book can have more than 1 queues and with some limit
 *           items:
 *             type: ObjectId
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 *
 */





// * BOOK BORROWING HISTORY
/**
 * @swagger
 * components:
 *   schemas:
 *     Book Borrowing History:
 *       type: object
 *       required:
 *         - id_buku
 *         - id_user
 *         - total_page
 *       description: The document structure of the bookborrowinghistories collection in the database
 *       properties:
 *           id_buku:
 *             type: objectId
 *             description: Book id from book document on books collection
 *           id_user:
 *             type: objectId
 *             description: User id from user document on users collection
 *           page_finished:
 *             type: integer
 *             description: The last page read by the user
 *           total_page:
 *             type: integer
 *             description: The total number of pages in the book
 *           n_borrowed:
 *             type: integer
 *             description: How many times has the user borrowed this book
 *           finished:
 *             type: boolean
 *             description: Has the user finished reading this book or not
 *           like:
 *             type: boolean
 *             description: If user like this book
 *           review:
 *             type: object
 *             properties:
 *               data:
 *                 type: string
 *                 description: user review data for this book
 *               createdAt:
 *                 type: date
 *                 description: date user post review data
 *               updatedAt:
 *                 type: date
 *                 description: date user replace the data review for this book
 *           createdAt:
 *             type: date
 *           updatedAt:
 *             type: date
 *
 */





// * CATEGORIES
/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *       description: The document structure of the categories collection in the database
 *       properties:
 *         name:
 *           type: string
 *           description: The category name
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 */





// * COMMENTS
/**
 * @swagger
 * components:
 *   schemas:
 *     Comment:
 *       type: object
 *       required:
 *         - id_user
 *         - id_history
 *         - data
 *       description: The document structure of the comments collection in the database
 *       properties:
 *         id_user:
 *           type: objectId
 *           description: User id from user document on users collection
 *         id_history:
 *           type: objectId
 *           description: History borrowing id from borrowing histories document on bookborrowinghistories collection
 *         data:
 *           type: string
 *           description: User's comments data on the related book review data
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */





// * PUBLISHER
/**
 * @swagger
 * components:
 *   schemas:
 *     Publisher:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       description: The document structure of the publishers collection in the database
 *       properties:
 *         name:
 *           type: string
 *           description: The publisher name
 *         address:
 *           type: string
 *           description: The publisher office or related address
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 */





// * QUEUE
/**
 * @swagger
 * components:
 *   schemas:
 *     Queue:
 *       type: object
 *       required:
 *         - id_user
 *         - id_buku
 *         - date_in
 *       description: The document structure of the queues collection in the database
 *       properties:
 *         id_user:
 *           type: objectId
 *           description: User id from user document on users collection
 *         id_buku:
 *           type: objectId
 *           description: Book id from book document on books collection
 *         date_in:
 *           type: date
 *           description: The time when the user entered the queue, used to calculate the queue number
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 */





// * USER - user
/**
 * @swagger
 * components:
 *   schemas:
 *     User - Role "user":
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - name
 *         - password
 *         - address
 *         - role
 *       description: The user document with role "user" structure of the users collection in the database
 *       properties:
 *         email:
 *           type: string
 *           description: user email data, using for login
 *         username:
 *           type: string
 *           description: user unique username for identification profile
 *         name:
 *           type: string
 *           description: user profile name
 *         password:
 *           type: string
 *           description: user account password data, using for login
 *         address:
 *           type: object
 *           properties:
 *             prov:
 *               type: string
 *               description: user province address name
 *             kota:
 *               type: string
 *               description: user city address name
 *             kec:
 *               type: string
 *               description: user district address name
 *         role:
 *           type: string
 *           example: user
 *           description: user role
 *         token:
 *           type: object
 *           properties:
 *             refresh:
 *               type: string
 *               description: user refresh_token data
 *             auth:
 *               type: string
 *               description: user authentication random token data
 *             forgetPass:
 *               type: string
 *               description: user forgetPass token data
 *         queue:
 *           description: A collection of id with objectId format from queues document, containing information about the books that the user entered as a queue
 *           type: array
 *           items:
 *             type: ObjectId
 *         borrowing:
 *           description: A collection of id with objectId format from borrowings document, containing information about the books that the user entered as a borrowers
 *           type: array
 *           items:
 *             type: ObjectId
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 *
 *
 */





// * USER - admin
/**
 * @swagger
 * components:
 *   schemas:
 *     User - Role "admin":
 *       type: object
 *       required:
 *         - email
 *         - username
 *         - name
 *         - password
 *         - address
 *         - role
 *       description: The user document with role "admin" structure of the users collection in the database
 *       properties:
 *         email:
 *           type: string
 *           description: user email data, using for login
 *         username:
 *           type: string
 *           description: user unique username for identification profile
 *         name:
 *           type: string
 *           description: user profile name
 *         password:
 *           type: string
 *           description: user account password data, using for login
 *         address:
 *           type: object
 *           properties:
 *             prov:
 *               type: string
 *               description: user province address name
 *             kota:
 *               type: string
 *               description: user city address name
 *             kec:
 *               type: string
 *               description: user district address name
 *         role:
 *           type: string
 *           example: admin
 *           description: user role
 *         token:
 *           type: object
 *           properties:
 *             refresh:
 *               type: string
 *               description: user refresh_token data
 *             auth:
 *               type: string
 *               description: user authentication random token data
 *             forgetPass:
 *               type: string
 *               description: user forgetPass token data
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 *
 *
 */





// * WISHLIST
/**
 * @swagger
 * components:
 *   schemas:
 *     Wishlist:
 *       type: object
 *       required:
 *         - id_buku
 *         - id_user
 *       description: The document structure of the wishlists collection in the database
 *       properties:
 *         id_user:
 *           type: objectId
 *           description: User id from user document on users collection
 *         id_buku:
 *           type: objectId
 *           description: Book id from book document on books collection
 *         createdAt:
 *           type: date
 *         updatedAt:
 *           type: date
 *
 */





// * -------- -------- -------- -------- TAGS -------- -------- -------- -------- * //
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Acoount Auth Process
 */

/**
 * @swagger
 * tags:
 *   name: Location
 *   description: Get Location for Address Dropdown Signup
 */

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Authors Data Configurations (Book properties)
 */

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Category Data Configurations (Book properties)
 */

/**
 * @swagger
 * tags:
 *   name: Publisher
 *   description: Publisher Data Configurations (Book properties)
 */

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin Specific Endpoint Access
 */

/**
 * @swagger
 * tags:
 *   name: Book
 *   description: Book Data Configuration
 */

/**
 * @swagger
 * tags:
 *   name: Book - Comments
 *   description: Book Data Configuration - Comments Section
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: User Things (Mostly for user role)
 */

/**
 * @swagger
 * tags:
 *   name: User - Borrow
 *   description: User Things (Mostly for user role)
 */

/**
 * @swagger
 * tags:
 *   name: User - History/Review
 *   description: User Things (Mostly for user role)
 */

/**
 * @swagger
 * tags:
 *   name: User - Wishlist
 *   description: User Things (Mostly for user role)
 */

/**
 * @swagger
 * tags:
 *   name: User - Queue
 *   description: User Things (Mostly for user role)
 */