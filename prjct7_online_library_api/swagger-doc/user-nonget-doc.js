//* ------------------------------ BOOK DOCUMENTATION ------------------------------ *//

//*! ------------------------------ POST POST POST

//*! POST REVIEWS DATA ON HISTORY_BORROWING DOCUMENT
/**
 * @swagger
 * /users/reviews/delete:
 *   post:
 *     summary: Post Reviews Data on History Book Borrowing Document
 *     tags: [User - History/Review]
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
 *               id_history:
 *                 type: string
 *
 *     responses:
 *       '200_success_delete':
 *         description: Success delete review
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success delete review
 *       '200_no_writtern_yet':
 *         description: You have not written a review for this book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: You have not written a review for this book
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: History Data ID Not Found
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





//*! POST REVIEWS DATA ON HISTORY_BORROWING DOCUMENT
/**
 * @swagger
 * /users/reviews:
 *   post:
 *     summary: Post Reviews Data on History Book Borrowing Document
 *     tags: [User - History/Review]
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
 *               id_history:
 *                 type: string
 *               data:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: The Book Already in Your Wishlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Post Reviews Data
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: History Data ID Not Found
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





//*! POST LIKE
/**
 * @swagger
 * /users/likes:
 *   post:
 *     summary: User Post Like to Book that already completed reading
 *     tags: [User - History/Review]
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
 *       '200_like_book':
 *         description: Success Like Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Liked Book
 *       '200_un-like_book':
 *         description: Success Un-Like Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Un-liked Book
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: History Data ID Not Found
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





//*! POST NEW WISHLIST DATA BOOK
/**
 * @swagger
 * /users/wishlists:
 *   post:
 *     summary: Post new Wishlist Data Book
 *     tags: [User - Wishlist]
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
 *         description: The Book Already in Your Wishlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: The Book Already in Your Wishlists
 *       '201':
 *         description: Success Add Book to the Wishlist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Add Book to the Wishlist
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
 *         description: Book Data not Found
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





//*! POST RETURN BOOK FROM USER BORROWING
/**
 * @swagger
 * /users/borrows/return:
 *   post:
 *     summary: User return book
 *     tags: [User - Borrow]
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
 *               id_borrow:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Returning Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Returning the Borrowing Book
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Borrow ID Not Found in User Borrowing List
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





//*! POST BORROW NEW BOOK (USER)
/**
 * @swagger
 * /users/borrows:
 *   post:
 *     summary: Post new User Borrowing Book Data
 *     tags: [User - Borrow]
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
 *         description: Success Borrow Book
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Borrow Book, Please Check Borrowing List
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
 *         description: Book Data not Found
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





//*! POST OUT QUEUE
/**
 * @swagger
 * /users/queues/out:
 *   post:
 *     summary: Post User Out from Queues Book Data
 *     tags: [User - Queue]
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
 *               id_queue:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Add Book to queues user list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success add book data to your queue list
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
 *         description: Book Data not Found
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





//*! POST QUEUE DATA
/**
 * @swagger
 * /users/queues:
 *   post:
 *     summary: Post new User Queues Book Data
 *     tags: [User - Queue]
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
 *       '200_success':
 *         description: Success Add Book to queues user list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success add book data to your queue list
 *       '200_already_queue':
 *         description: Book data already in your queue list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Book data already in your queue list
 *       '200_still_borrowing':
 *         description: Book still being borrowed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Book still being borrowed, you cann't queue this book until returning the book
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
 *         description: Book Data not Found
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





//*! ------------------------------ PATCH PATCH PATCH


//*! PATCH EDIT USER DATA
/**
 * @swagger
 * /users:
 *   patch:
 *     summary: Edit User Data
 *     tags: [User]
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
 *               username:
 *                 type: string
 *               name:
 *                 type: string
 *               provinsi:
 *                 type: string
 *               kota:
 *                 type: string
 *               kecamatan:
 *                 type: string
 *
 *     responses:
 *       '200':
 *         description: Success Edit User Data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Edit User Data
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
 *                   example: username Error Input
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





//*! EDIT / UPDATE User Borrowing Book Page Data
/**
 * @swagger
 * /users/borrows:
 *   patch:
 *     summary: Edit / Update Borrowing Book page Data
 *     tags: [User - Borrow]
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
 *               id_borrow:
 *                 type: string
 *               page:
 *                 type: integer
 *
 *     responses:
 *       '200':
 *         description: Success Remove Book Data from Your Wishlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Remove Book Data from Your Wishlists
 *       '400':
 *         description: Input Data not Valid
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Borrow ID Not Found in User Borrowing List
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





//*! ------------------------------ DELETE DELETE DELETE

//*! DELETE (remove) BOOK DATA FROM USER WISHLIST DATA
/**
 * @swagger
 * /users/wishlists:
 *   delete:
 *     summary: Delete Book data from User Wishlists
 *     tags: [User - Wishlist]
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
 *         description: Success Remove Book Data from Your Wishlists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: false
 *                 message:
 *                   example: Success Remove Book Data from Your Wishlists
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
 *         description: Book Data not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   example: true
 *                 message:
 *                   example: Book Data not Found on Your Wishlists
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