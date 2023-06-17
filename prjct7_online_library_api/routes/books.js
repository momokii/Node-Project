const router = require('express').Router()
const Book = require('../models/books')
const bookController = require('../controllers/bookController')
const isAuth = require('../middleware/is-auth')
const statusCode = require('../util/status-code').httpStatus_keyValue

function throw_err(msg) {
    const err = new Error(msg)
    err.statusCode = statusCode['400_bad_request']
    throw err
}

// * ----------------------------------- ROUTING -----------------------------------


router.get('/', bookController.getAllBooks)

router.get('/:id_buku/reviews/:id_history', bookController.getReviewDetail)

router.get('/:id_buku/reviews', bookController.getAllReviews)

router.get('/:id_buku/:list_check', isAuth, bookController.getBookListCheck) //* hanya admin

router.get('/:id_buku', bookController.getBookDetail)




router.post('/', isAuth, bookController.postBook) //* hanya admin

router.post('/:id_buku/reviews/:id_history/comments', isAuth, bookController.postComment) //* * user role have access *




router.patch('/', isAuth, bookController.editBook) //* hanya admin




router.delete('/', isAuth, bookController.deleteBook) //* hanya admin

router.delete('/:id_buku/reviews/:id_history/comments', isAuth, bookController.deleteComment) //* * user role have access *




module.exports = router

