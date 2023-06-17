const User = require('../models/users')
const Category = require('../models/categories')
const Book = require('../models/books')
const statusCode = require('../util/status-code').httpStatus_keyValue


// * ----------------------------------- CONTROLLER -----------------------------------


exports.getCategory = async (req, res, next) => {
    try{
        //*? PAGINATION CONFIGURATION OPTIONS
        let categories
        const totalData = await Category.find().countDocuments()
        const response = {
            errors: false,
            message: "Get Category Data",
            data: {
                total_data: totalData
            }
        }

        const currentPage = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startData = ((currentPage - 1) * size )

        categories = await Category.find().skip(startData).limit(size).select('_id name')

        response.data = {
            ...response.data,
            current_page: currentPage,
            per_page: size,
            categories: categories
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postCategory = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const name = req.body.name

        const category = await Category.findOne({name : name})
        if(category){
            const err = new Error('The Category Name has Already been Used! Please Use Another Name')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const newCategory = new Category({
            name: name
        })

        await newCategory.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: "Success Create new Category Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editCategory = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const category = await Category.findById(req.body.id_category)
        if(!category){
            const err = new Error('Edit Failed!')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        const category_check = await Category.findOne({name : req.body.new_name})
        if(category_check){
            const err = new Error('The Category Name has Already been Used! Please Use Another Name')
            err.statusCode = statusCode['400_bad_request']
            throw err
        }

        category.name = req.body.new_name

        await category.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Edit Category Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteCategory = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized!')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const category = await Category.findById(req.body.id_category)
        if(!category){
            const err = new Error('Category Data not Found!')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        // *! check if the data is registered on one of book data -> if yes cann't delete the data
        const book_check = await Book.findOne({category:req.body.id_category})
        if(book_check){
            const err = new Error('Not Authorized! The Category Data is Already Registered in One of The Book Data')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }
        // *! ----------------------------------------------------------------

        await Category.findByIdAndDelete(req.body.id_category)


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Delete Category Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}