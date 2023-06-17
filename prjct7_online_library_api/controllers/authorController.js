const Author = require('../models/author')
const User = require('../models/users')
const Publisher = require("../models/publishers");
const Book = require('../models/books')
const statusCode = require('../util/status-code').httpStatus_keyValue


// * ----------------------------------- CONTROLLER -----------------------------------

exports.getAuthors = async (req, res, next) => {
    try{
        //*? PAGINATION CONFIGURATION OPTIONS
        let authors
        const totalData = await Author.find().countDocuments()
        const response = {
            errors: false,
            message: "Get Authors Data",
            data: {
                total_data: totalData
            }
        }


        const currentpage = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startData = ((currentpage - 1) * size)

        authors = await Author.find().skip(startData).limit(size).select('_id name profile')

        response.data = {
            ...response.data,
            current_page: currentpage,
            per_page: size,
            authors: authors
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postAuthor = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const name = req.body.name
        const profile = req.body.profile

        const author = await Author.findOne({name : name})
        if(author){
            const err = new Error('Author Name has Already been Used! Please Check the Name Again')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const newAuthor = new Author({
            name: name,
            profile: profile
        })

        await newAuthor.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: "Success Create new Author Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editAuthor = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const author = await Author.findById(req.body.id_author)
        if(!author){
            const err = new Error('Edit Failed!')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const author_check = await Author.findOne({name : req.body.new_name})
        if(author_check){
            const err = new Error('The Author Name has Already been Used! Please Use Another Name')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        author.name = req.body.new_name
        author.address = req.body.new_profile

        await author.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Edit Author Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteAuthor = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const author = await Author.findById(req.body.id_author)
        if(!author){
            const err = new Error('Author Data not Found!')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        // *! check if the data is registered on one of book data -> if yes cann't delete the data
        //const book_check = await Book.findOne({authors :req.body.id_author})
        const book_check = await Book.findOne({authors : { $elemMatch: { $eq: req.body.id_author } } })
        //* dua jenis check di atas hasilkan sama saja dan bisa dicoba semua berhasil
        if(book_check){
            const err = new Error('Not Authorized! The Author Data is Already Registered in One of The Book Data')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }
        // *! ----------------------------------------------------------------

        await Author.findByIdAndDelete(req.body.id_author)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Delete Author Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}