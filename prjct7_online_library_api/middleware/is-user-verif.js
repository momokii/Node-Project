const statusCode = require('../util/status-code').httpStatus_keyValue
const User = require('../models/users')

/**
 * ? user-verif MIDDLEWARE
 * * berguna untuk pastikan bahwa JIKA role adalah 'user' untuk pastikan yang lewat user-nya sudah sesuai dengan username pada PARAMETER -> /{username}
 * * hal di atas karena pada routing USER hampir semua gunakan /:username dimana juga jika yang akses merupakan user maka hanya bisa diakses oleh user terkait tidak bisa dengan user lain (UNTUK BEBERAPA ENDPOINT TERTENTU) untuk memudahkan maka buat middleware untuk PASTIKAN JIKA role user LOGIN maka pastikan yang login username === username di PARAMETER PATH
 */

module.exports = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err('User not Found, Authorization Error', statusCode['401_unauthorized'])
        }

        if(user.role === 'user' && user.username !== req.params.username){
            throw_err('User not Authorize', statusCode['401_unauthorized'])
        }

        // * check karena ada kemungkinan akan digunakan oleh admin, maka pengecekan data dari PARAMETER USERNAME maka cek apakah valid atau tidak
        // *? check dilakukan di middleware karena dengan kemungkinan di atas, maka pasti akan cek username dahulu disemua ednpoint yang gunakan username namun juga admin bisa akses
        const user_check = await User.findOne({username: req.params.username})
        if(!user_check){
            const err = new Error('Username Data not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        req.user = user_check
        next()

    } catch (e) {
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}