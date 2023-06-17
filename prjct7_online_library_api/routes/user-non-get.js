/**
 * * USER CONTROLLER
 * * It will contain a controller that is directly related to the main role of the "user" (primary user).
 */

const router = require('express').Router()
const isAuth = require('../middleware/is-auth')
const userController = require('../controllers/userNonGetController')
const { body } = require('express-validator')
const User = require('../models/users')
const statusCode = require('../util/status-code').httpStatus_keyValue

//* base endpoint -> /users/
//* tidak gunakan /users/{username} -> karena masalah kredensial dan penggunaan sebelumnya karena ada akses untuk admin melihat dan juga fungsi GET

// * ----------------------------------- ROUTING -----------------------------------

// *! ------------------------ POST POST POST

router.post('/reviews/delete', isAuth, userController.deleteReviews)

router.post('/reviews', isAuth, userController.postReviews)

router.post('/likes', isAuth, userController.postLikes)

router.post('/wishlists', isAuth, userController.postWishlist)

router.post('/borrows/return', isAuth, userController.postReturnBorrowingBook)

router.post('/borrows', isAuth, userController.postBorrowingBook)

router.post('/queues/out', isAuth, userController.postQueueOut)

router.post('/queues', isAuth, userController.postQueueIn)





// *! ------------------------ PATCH PATCH PATCH

router.patch('/', isAuth,[
    body('username', "Username must be Alphanumeric with Minimum 5 Character")
        .isAlphanumeric()
        .isLength({min : 5})
        .custom((value, {req}) => {
            return (async () => {
                const user = await User.findOne({username: value})
                if(user && user._id.toString() !== req.userId ){
                    const err = new Error('Username Already Taken, Please use Another Username')
                    err.statusCode = statusCode['400_bad_request']
                    throw err
                }
            })()
        })
] , userController.patchEditUserinfo)


router.patch('/borrows', isAuth, userController.editBorrowsPage)




// *! ------------------------ DELETE DELETE DELETE

router.delete('/wishlists', isAuth, userController.deleteWishlists)



module.exports = router