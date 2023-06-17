const Publisher = require("../models/publishers")
const User  = require('../models/users')
const Book = require('../models/books')
const statusCode = require('../util/status-code').httpStatus_keyValue

// async (req, res, next) => {
//     try{
//
//     } catch (e) {
//         if(!e.statusCode) {
//             e.statusCode = statusCode['500_internal_server_error']
//         }
//         next(e)
//     }
// }

// * ----------------------------------- CONTROLLER -----------------------------------


exports.getPublishers = async (req, res, next) => {
    try{
        // *? PAGINATION CONFIGURATION OPTIONS
        let publishers
        const totalData = await Publisher.find().countDocuments()
        const response = {
            errors: false,
            message: "Get Publisher Data",
            data: {
                total_data: totalData
            }
        }

        const currentPage = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startData = ((currentPage - 1) * size)

        publishers = await Publisher.find().skip(startData).limit(size).select('_id name address')

        response.data = {
            ...response.data,
            current_page: currentPage,
            per_page: size,
            publishers: publishers
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postPublisher = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const name = req.body.name
        const address = req.body.address

        const publisher = await Publisher.findOne({name : name})
        if(publisher){
            const err = new Error('The Publisher Name has Already been Used! Please Use Another Name')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const newPublisher = new Publisher({
            name: name,
            address: address
        })

        await newPublisher.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: "Success Create new Publisher Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editPublisher = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const publisher = await Publisher.findById(req.body.id_publisher)
        if(!publisher){
            const err = new Error('Edit Failed!')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const publisher_check = await Publisher.findOne({name : req.body.new_name})
        if(publisher_check){
            const err = new Error('The Publisher Name has Already been Used! Please Use Another Name')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        publisher.name = req.body.new_name
        publisher.address = req.body.new_address

        await publisher.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Edit Publisher Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deletePublisher = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const publisher = await Publisher.findById(req.body.id_publisher)
        if(!publisher){
            const err = new Error('Publisher Data not Found!')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        // *! check if the data is registered on one of book data -> if yes cann't delete the data
        const book_check = await Book.findOne({publisher:req.body.id_publisher})
        if(book_check){
            const err = new Error('Not Authorized! The Publisher Data is Already Registered in One of The Book Data')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }
        // *! ----------------------------------------------------------------

        await Publisher.findByIdAndDelete(req.body.id_publisher)


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Delete Publisher Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}