const User = require('../models/users')
const statusCode = require('../util/status-code').httpStatus_keyValue


// * ----------------------------------- CONTROLLER -----------------------------------

exports.getAllUsers = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        //*? PAGINATION CONFIGURATIONS OPTIONS
        let users
        const totalUser = await User.find({role: 'user'}).countDocuments()
        const response = {
            errors: false,
            message: "Get Users Data",
            data: {
                total_data: totalUser
            }
        }

        const currentPage = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startData = ((currentPage - 1) * size)

        users = await User.find({role: 'user'}).skip(startData).limit(size).select('_id email username name address')

        response.data = {
            ...response.data,
            current_page: currentPage,
            per_page: size,
            users: users
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}