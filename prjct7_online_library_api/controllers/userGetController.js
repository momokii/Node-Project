/**
 * * USER only-GET CONTROLLER
 * * It will contain a controller that is directly related to the main role of the "user" (primary user).
 */

const User = require('../models/users')
const Book = require('../models/books')
const Wishlist = require('../models/wishlist')
const Comment = require('../models/comments')
const Queue = require('../models/queue')
const BookBorrowingHistory = require('../models/books_borrowing_history')
const statusCode = require('../util/status-code').httpStatus_keyValue

const { format } = require('date-fns')
const mongoose = require('mongoose')

// * ----------------------------------- CONTROLLER -----------------------------------

//*! ----------------- GET GET GET

exports.getUserDetail = async (req, res, next) => {
    try{
        const userDetail = await User.findOne({username: req.params.username})
            .select('email username name address role queue borrowing')
        //* Still do checking -> bcs admin can access all user role data and is possible ADMIN role input username THAT NOT BEEN USED
        if(!userDetail){
            const err = new Error('Username Data not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Detail Users Data',
            data: userDetail
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getBorrowingData = async (req, res, next) => {
    try{
        const borrow_data = await User.findOne({username: req.params.username})
            .select('username') //* karena borrowing dipopulate maka otomatis pasti akan ada
            .populate({
                path: 'borrowing',
                select: 'id_buku read_page date_in date_out',
                populate: {
                    path: 'id_buku',
                    select: 'title authors publisher category year page summary',
                    populate: {
                        path: 'category publisher authors',
                        select: 'name'
                    }
                }
            })
            .lean() //* change TYPE to JAVASCRIPT OBJ -> so can edit it and it's save bcs we just view to user not change/save anything

        if(borrow_data.borrowing){
            borrow_data.borrowing.forEach(doc => {
                const set_date_in = new Date(doc.date_in)
                const set_date_out = new Date(doc.date_out)

                //* format date and set to view
                doc.date_in = format(set_date_in, "dd-MMMM-yyyy HH:mm")
                doc.date_out = format(set_date_out, "dd-MMMM-yyyy HH:mm")
            })
        }

        res.status(statusCode['200_ok']).json({
            errors:false,
            message: "Get User Book Borrowing Data",
            data: borrow_data//.borrowing
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getOneDetailQueueData = async (req, res, next) => {
    try{
        const user = await User.findOne({username: req.params.username})
        if(!user){
            const err = new Error('User not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        const id_queue = req.params.id_queue
        if(!user.queue.includes(new mongoose.Types.ObjectId(id_queue))){
            const err = new Error('Queue ID not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        // * cari id queue
        // * dari queue -> dapat id_buku -> bisa lihat queue no berapa dari POPULATE buku
        // * kemudian sort date_in dari array queue dari objek buku
        const queue_data = await Queue.findById(id_queue)
            .select('id_buku date_in')
            .populate({
                path: 'id_buku',
                select: 'title summary queue',
                populate: {
                    path: 'queue',
                    select: 'id_user date_in',
                    // * langsung sort dari query
                    options: {
                        sort : {date_in : 1}
                    }
                }
            })
            //.lean()


        const book_queue_data = queue_data.id_buku
        // * sorting array asc berdasarkan date_in -> sort secara manual
        const sorted_book_array_queue = book_queue_data.queue//.sort((a, b) => a.date_in - b.date_in)
        // * search index (search no queue)
        const queue_length = sorted_book_array_queue.length
        const no_queue = sorted_book_array_queue.findIndex((data) => data._id.toString() === id_queue) + 1

        // console.log(user)
        // console.log(queue_data)
        // console.log(id_queue)
        // console.log(`Queue no ${no_queue} / ${queue_length}`)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get one detail queue data",
            data:{
                username: user.username,
                name: user.name,
                queue_data: {
                    _id: queue_data._id,
                    queue_length: queue_length,
                    queue_no: no_queue,
                    date_in: queue_data.date_in
                },
                book_data: {
                    _id: book_queue_data._id,
                    title: book_queue_data.title,
                    summary: book_queue_data.summary
                }
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getQueueData = async (req, res, next) => {
    try{
        const queue_data = await User.findOne({username: req.params.username})
            .select('username')
            .populate({
                path: 'queue',
                select: 'date_in',
                populate: {
                    path: 'id_buku',
                    select: 'title year page summary',
                    populate: {
                        path: 'authors publisher category',
                        select: 'name'
                    }
                }
            })
            .lean()

        // // * logic hitung antrian
        // // *? sorting
        // if (queue_data && queue_data.queue) {
        //     //* descending
        //     queue_data.queue.sort((a, b) => b.date_in - a.date_in);
        // }
        // // *? get index number jika sudah diurutkan
        // console.log(queue_data.queue.findIndex(data => data._id.toString() === '64758598ea6fd53035d05031') + 1)
        // // * -----------------------


        if(queue_data.queue){
            let id_queue = []
            queue_data.queue.forEach(doc => {
                const set_date_in = new Date(doc.date_in)

                doc.date_in = format(set_date_in, "dd-MMMM-yyyy HH:mm")

                id_queue.push(doc.id_buku._id)
            })

            //* ----------------------- coba fungsi get nomor antrian
            // const antrean = await Book.find({_id: {$in: id_queue}})
            //     .populate({
            //         path: 'queue',
            //         select: 'id_user date_in'
            //     }).lean()
            //
            // antrean.forEach(doc => {
            //     console.log()
            // })
            // const num_antrean = antrean.queue
            // console.log(num_antrean)
            // num_antrean.forEach(doc => {
            //     console.log(doc)
            // })

            //* -----------------------

        }



        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get User queue list Data',
            data: queue_data
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getWishlistData = async (req, res, next) => {
    try{
        let book_data = []
        //* PAGINATION CONFIGURATION
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startData = (page - 1) * size
        const total_data = await Wishlist.find({id_user: req.user._id}).countDocuments()

        //* tetap gunakan req.user._id -> karena pada checking middleware yang dicheck adalah req.params.username
        const userWishlists = await Wishlist.find({id_user: req.user._id})
            .select('id_buku -_id')
            //.select({$rename: {'id_buku': "book_data"}})
            .populate('id_buku','title year page summary')
            .skip(startData)
            .limit(size)

        userWishlists.forEach(data => {
            //* hanya ambil data buku saja yang akan ditampilkan
            book_data.push(data.id_buku)
        })

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Get User Wishlists Data",
            data: {
                total_data: total_data,
                current_page: page,
                per_page: size,
                wishlists: book_data
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.getLikesBookList = async (req, res, next) => {
    try{
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startData = (page - 1) * size
        const total_data = await BookBorrowingHistory.find({
            id_user : req.user._id.toString(),
            like : true
        }).countDocuments()

        const like_book = await BookBorrowingHistory.find({
            id_user : req.user._id.toString(),
            like : true
        })
            .select('id_buku -_id')
            .populate({
                path: 'id_buku',
                populate : {
                    path: 'authors publisher category',
                    select: 'name'
                },
                select: 'year page like summary image_url'
            })

        res.status(statusCode['200_ok']).json({
            errors : false,
            message: 'Get Users Liked Book',
            data: {
                current_page: page,
                per_page: size,
                total_data : total_data,
                liked : like_book
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.getCommentList = async (req, res, next) => {
    try{
        //* PAGINATION CONFIGURATION
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 10
        const startData = (page - 1) * size
        const total_data = await Comment.find({ id_user: req.user._id.toString() }).countDocuments()

        const comments = await Comment.find({ id_user: req.user._id.toString() })
            .select('id_history createdAt data')
            .skip(startData)
            .limit(size)


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get Users Comments Data',
            data: {
                current_page: page,
                per_page: size,
                total_data: total_data,
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





exports.getHistoryBorrowing = async (req, res, next) => {
    try{
        const params = req.params.id_history

        let all_history = await BookBorrowingHistory.find({id_user: req.user._id.toString()})
            .select('page_finished total_page n_borrowed finished like review')
            .populate({
                path: 'id_buku',
                select: 'title summary',
                populate: {
                    path: 'authors publisher category',
                    select: 'name'
                }
            })
            .lean()

        // * JIKA GUNAKAN PARAMS -> berarti hanya GET 1 DATA SAJA (JIKA ADA)
        if(params){
            all_history = all_history.filter(doc => {
                if(doc._id.toString() === params){
                    return doc
                }
            })

            if(all_history.length > 0 ){
                all_history = all_history[0]
            } else {
                all_history = {}
            }

            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'Get User History Borrowing Data',
                data: all_history
            })
        }
        // * ---------------- ---------------- ----------------

        //* pengecekan jika hanya ingin tampilkan history yang ada reviews saja (query "reviews" = "true")
        const just_reviews = req.query.reviews
        if(just_reviews === 'true'){
            all_history = all_history.filter(doc => {
                if(doc.review.data){
                    return doc
                }
            })
        } else {
            //*? masuk else JIKA query "reviews" !== "true"
            //* atur tambahan tampilan ketika ada review dan tidak ada review
            all_history.forEach(doc => {
                if(doc.review.data){
                    doc.have_review = true
                } else{
                    doc.have_review = false
                }
                delete doc.review //* hapus properti review
            })
        }

        //* check if just need see the data liked
        const only_liked = req.query.liked
        if(only_liked === 'true'){
            all_history = all_history.filter(doc => {
                if(doc.like){
                    return doc
                }
            })
        }

        //* Karena ada beberapa if else di atas maka untuk konfigurasi pagination bisa set disini
        const page = parseInt(req.query.page) || 1
        const size = parseInt(req.query.size) || 5
        const startData = (page - 1) * size
        const total_data = all_history.length

        //* data pagination
        all_history = all_history.splice(startData, startData + size)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Get User History Borrowing Data',
            data: {
                total_data: total_data,
                current_page: page,
                per_page: size,
                history_data: all_history
            }
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}






