const Book = require('../models/books')
const User = require('../models/users')
const Publisher = require('../models/publishers')
const Authors = require('../models/author')
const Category = require('../models/categories')
const BookBorrowingHistory = require('../models/books_borrowing_history')
const Comment = require('../models/comments')
const statusCode = require('../util/status-code').httpStatus_keyValue


// * ----------------------------------- CONTROLLER -----------------------------------


// *! --------------------- --------------------- GET GET GET

exports.getAllBooks = async (req, res, next) => {
    try{
        // *? PAGINATION CONFIG
        let books
        const totalData = await Book.find().countDocuments()
        const response = {
            errors: false,
            message: "Get Books Data",
            data: {
                total_data: totalData
            }
        }

        // * --------------- ----- USE DIFFERENCE APPROACH BEACUSE USING SEARCH ----- ---------------
        const currentPage = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startData = ((currentPage - 1) * size)

        books = await Book.find()
            //.populate('authors', 'name profile -_id') // cara hilangkan _id agar tidak tampil
            .select('title year page like summary image_url')
            .populate('authors', 'name profile')
            .populate('category', 'name')
            .populate('publisher', 'name')
            //.skip(startData).limit(size)
            .lean()


        if(req.query.search){
            const q = req.query.search.toString().trim().toLowerCase()
            if(q){
                books = books.filter(doc => {
                    return doc.title.toLowerCase().includes(q)
                })
            }
        }

        books = books.slice(startData, startData + size)
        // * --------------- --------------- --------------- ---------------

        response.data = {
            ...response.data,
            current_page: currentPage,
            per_page: size,
            books: books
        }

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getReviewDetail = async (req, res, next) => {
    try{
        //* mirip dengan all review
        //* perbedaan pasti hanya tampilkan 1 review dan juga beserta seluruh komen yang ada(?)

        const book = await Book.findById(req.params.id_buku)
            .select('title year page summary image_url')
            .populate({
                path: 'authors publisher category',
                select: 'name'
            })
        if(!book){
            const err = new Error('Book ID not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        let book_review_history = await BookBorrowingHistory.findOne({
            id_buku: req.params.id_buku, _id: req.params.id_history
        })
            .select('id_user page_finished n_borrowed finished review')
            .populate({
                path: 'id_user',
                select: 'username'
            })

        //* jika data review pada history tidak ditemukan dibuat error 404
        if(!book_review_history.review.data){
            const err = new Error('Reviews Book Not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        //*! proses ini pagination dilakukan untuk tampilkan komentar terkait review
        //* PAGINATION CONFIG
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startPage = (page - 1) * size
        const total_data = await Comment.find({ id_history: req.params.id_history }).countDocuments()

        const comments = await Comment.find({ id_history: req.params.id_history })
            .select('data createdAt')
            .populate({
                path: 'id_user',
                select: 'username'
            })
            .skip(startPage)
            .limit(size)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Books Reviews",
            data: {
                total_data: total_data, //* total data merupakan total komen yang ada
                current_page: page,
                per_page: size,
                book_data: book,
                review: book_review_history,
                comments: comments
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getAllReviews = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id_buku)
            .select('title year page summary image_url')
            .populate({
                path: 'authors publisher category',
                select: 'name'
            })
        if(!book){
            const err = new Error('Book ID not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        //* PAGINATION CONFIG
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startPage = (page - 1) * size

        let all_book_review_history = await BookBorrowingHistory.find({id_buku: req.params.id_buku})
            .select('id_user page_finished n_borrowed finished review')
            .populate({
                path: 'id_user',
                select: 'username'
            })
        all_book_review_history = all_book_review_history.filter(doc => {
            if(doc.review.createdAt){
                return doc
            }
        })
        all_book_review_history = all_book_review_history.splice(startPage, startPage + size)
        const total_data = all_book_review_history.length

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Books Reviews",
            data: {
                total_data: total_data,
                current_page: page,
                per_page: size,
                book_data: book,
                reviews: all_book_review_history
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getBookListCheck = async (req, res, next) => {
    try{
        //* catatan
        //* JIKA TIDAK GUNAKAN QUERY akan hasilkan SAMA dengan detail 1 book
        //* namun proses tetap dipisah karena jika akan gunakan query maka HARUS ROLE ADMIN yang bisa akses
        //* ----------
        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const params = req.params.list_check
        let data_populate
        if(params === 'borrows'){
            data_populate = {
                path: 'borrowers',
                select: 'id_user date_in date_out read_page',
                populate: {
                    path: 'id_user',
                    select: 'username name borrowing'
                }
            }
        }
        else if(params === 'queues'){
            data_populate = {
                path: 'queue',
                select: 'id_user date_in',
                populate: {
                    path: 'id_user',
                    select: 'username name queue'
                }
            }
        }

        const book = await Book.findById(req.params.id_buku)
            .select('title year page like summary image_url')
            .populate('authors', 'name profile')
            .populate('publisher', 'name')
            .populate('category', 'name')
            .populate(data_populate)

        if(!book){
            const err = new Error('Book Data not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get Book Data",
            data: book
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getBookDetail = async (req, res, next) => {
    try{
        const book = await Book.findById(req.params.id_buku)
            .select('title year page like summary image_url')
            .populate('authors', 'name profile')
            .populate('publisher', 'name')
            .populate('category', 'name')
        //* BELUM TERSEDIA -> tapi nanti dibutuhkan untuk get detail reviews dan komen terkait
        //*! CODE CODE CODE
        //* ----------------------------------

        if(!book){
            const err = new Error('Book Data Not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get One Detail Book Data",
            data: book
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *! --------------------- --------------------- POST POST POST

exports.postBook = async (req, res, next) => {
    try{
        function error(msg, statusCode){
            const err = new Error(msg)
            err.statusCode = statusCode
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            error('Not Authorized', statusCode['401_unauthorized'])
        }

        //* BOOK DATA
        const title = req.body.title
        //*! check similar name
        const name_eq = await Book.findOne({title: title})
        if(name_eq){
            error('Book Title has Already been Used! Please Check the Title Again', statusCode['400_bad_request'])
        }
        const year = parseInt(req.body.year)
        const page = parseInt(req.body.page)
        const summary = req.body.summary
        //*? gambar sekarang kasih default value
        const image_url = "kosong"


        //*! PROPERTY BOOK DEPENS ON OTHER OBJECT/ COLLECTION -> Check if not valid objectid
        //* cek authors validation
        const authors = req.body.authors
        const author_check = await Authors.countDocuments({_id: {$in : authors}})
        if(author_check !== authors.length){
            error('Data Input Error', statusCode['400_bad_request'])
        }

        //* cek publisher and category validation
        const publisher = await Publisher.findById(req.body.publisher_id)
        const category = await Category.findById(req.body.category_id)
        if(!publisher || !category){
            error('Data Input Error', statusCode['400_bad_request'])
        }
        //*! ------------------ ------------------ ------------------ ------------------


        //* ADD NEW BOOK
        const book = new Book({
            title: title, year: year, page: page, summary: summary, image_url: image_url,
            publisher: req.body.publisher_id,
            category: req.body.category_id,
            authors: req.body.authors
        })

        await book.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: "Success Add new Book Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postComment = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Not Authorized', statusCode['401_unauthorized'])
        }

        const book = await Book.findById(req.params.id_buku)
        if(!book){
            throw_err('Book ID Data not Found', statusCode['404_not_found'])
        }

        //* even can filter just with id_history -> to extra protection use like below
        const review_data = await BookBorrowingHistory.findOne({
            _id: req.params.id_history, id_buku: req.params.id_buku
        })

        if(!review_data || !review_data.review.data){
            throw_err('Review Data not Found', statusCode['404_not_found'])
        }

        const data_comment = req.body.data
        const new_comment = new Comment({
            id_user: user._id,
            id_history: req.params.id_history,
            data: data_comment
        })

        await new_comment.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: 'Success Add new Comment'
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *! --------------------- --------------------- PATCH PATCH PATCH

exports.editBook = async (req, res, next) => {
    try{
        function error(msg, statusCode){
            const err = new Error(msg)
            err.statusCode = statusCode
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            error('Not Authorized', statusCode['401_unauthorized'])
        }

        const book = await Book.findById(req.body.id_buku)
        if(!book){
            error('Book Data Not Found', statusCode['404_not_found'])
        }

        //* BOOK NEW DATA DATA
        const title = req.body.title
        //*! check similar name
        const name_eq = await Book.findOne({title: title})
        if(name_eq && name_eq._id.toString() !== req.body.id_buku){
            error('Book Title has Already been Used! Please Check the Title Again', statusCode['400_bad_request'])
        }
        const year = parseInt(req.body.year)
        const page = parseInt(req.body.page)
        const summary = req.body.summary
        //*? gambar sekarang kasih default value
        const image_url = "kosong"

        //*! PROPERTY BOOK DEPENDS ON OTHER OBJECT/ COLLECTION -> Check if not valid objectid
        //* cek authors validation
        const authors = req.body.authors
        const author_check = await Authors.countDocuments({_id: {$in : authors}})
        if(author_check !== authors.length){
            error('Data Input Error author', statusCode['400_bad_request'])
        }

        //* cek publisher and category validation
        const publisher = await Publisher.findById(req.body.publisher_id)
        const category = await Category.findById(req.body.category_id)
        if(!publisher || !category){
            error('Data Input Error', statusCode['400_bad_request'])
        }

        //* EDIT BOOK DATA
        book.title = title
        book.year = year
        book.page = page
        book.summary = summary
        // *! gambar

        book.authors = authors
        book.publisher = publisher
        book.category = category

        await book.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Edit Book Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





// *! --------------------- --------------------- DELETE DELETE DELETE

exports.deleteBook = async (req, res, next) => {
    try{
        function error(msg, statusCode){
            const err = new Error(msg)
            err.statusCode = statusCode
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user || user.role !== 'admin'){
            error('Not Authorized', statusCode['401_unauthorized'])
        }

        const book = await Book.findById(req.body.id_buku)
        if(!book){
            error('Book Data Not Found', statusCode['404_not_found'])
        }

        //*! CATATAN CEK MISAL HUBUNGAN DENGAN ANTRIAN DAN PEMINJAMAN MAU GIMANA
        //* CODE CODE CODE

        if(book.borrowers.length >= 1 || book.queue.length >= 1){
            error('Not Authorized, Book still have queue and borrowers', statusCode['401_unauthorized'])
        }

        //*! ----------------------------------

        await Book.findByIdAndRemove(req.body.id_buku)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Delete Book Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.deleteComment = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Not Authorized', statusCode['401_unauthorized'])
        }

        const book = await Book.findById(req.params.id_buku)
        if(!book){
            throw_err('Book ID Data not Found', statusCode['404_not_found'])
        }

        //* even can filter just with id_history -> to extra protection use like below
        const review_data = await BookBorrowingHistory.findOne({
            _id: req.params.id_history, id_buku: req.params.id_buku
        })
        if(!review_data || !review_data.review.createdAt){
            throw_err('Review Data not Found', statusCode['404_not_found'])
        }

        const id_comment = req.body.id_comment
        const deleted_comment = await Comment.findOne({
            _id: id_comment, id_user: user._id.toString(), id_history: req.params.id_history
        })
        if(!deleted_comment){
            throw_err('Data Comment not Found', statusCode['404_not_found'])
        }

        await Comment.findByIdAndDelete({
            _id: id_comment, id_user: user._id.toString(), id_history: req.params.id_history
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Delete Comment"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}