/**
 * * USER CONTROLLER
 * * It will contain a controller that is directly related to the main role of the "user" (primary user).
 */

const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const isUserVerif = require('../middleware/is-user-verif')
const userController = require('../controllers/userGetController')

//* base endpoint -> /users/{username}

// * ----------------------------------- ROUTING -----------------------------------

router.get('/:username/borrows', isAuth, isUserVerif ,userController.getBorrowingData)

router.get('/:username/queues/:id_queue', isAuth, isUserVerif, userController.getOneDetailQueueData)

router.get('/:username/queues', isAuth, isUserVerif, userController.getQueueData)

router.get('/:username/wishlists', isAuth, isUserVerif , userController.getWishlistData)

router.get('/:username/liked', isAuth, isUserVerif ,userController.getLikesBookList)

router.get('/:username/comments', isAuth, isUserVerif , userController.getCommentList)

router.get('/:username/history/:id_history', isAuth, isUserVerif , userController.getHistoryBorrowing)

router.get('/:username/history', isAuth, isUserVerif , userController.getHistoryBorrowing)

router.get('/:username', isAuth, isUserVerif, userController.getUserDetail)





module.exports = router