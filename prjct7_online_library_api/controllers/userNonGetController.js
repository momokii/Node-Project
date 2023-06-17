/**
 * * USER non-GET CONTROLLER
 * * It will contain a controller that is directly related to the main role of the "user" (primary user).
 */

const User = require('../models/users')
const Book = require('../models/books')
const Borrowing = require('../models/book_borrowing')
const Queue = require('../models/queue')
const Wishlist = require('../models/wishlist')
const Comment = require('../models/comments')
const BookBorrowingHistory = require('../models/books_borrowing_history')
const statusCode = require('../util/status-code').httpStatus_keyValue
const {validationResult} = require('express-validator')

const cron = require("node-cron");
const cron_func = require('../middleware/cron-borrowing-check')
const mongoose = require("mongoose");

// * ---------- ---------- ---------- SCHEDULED CRON JOB ---------- ---------- ----------

// ** Schedule pengecekan jika ada peminjaman yang sudah kedaluarsa untuk dilakukan checkout
cron.schedule('*/1 * * * *', async () => {
    const borrowing_data = await Borrowing.find()
        .populate({
            path: 'id_buku',
            select: 'page'
        })
    const time_now = new Date()

    for(const doc of borrowing_data){
        if(doc.date_out < time_now){
            await cron_func.borrowingCheckout(doc)
        }
    }
} );





cron.schedule('*/30 * * * * *', async () => {
    const MAX_BOOK_BORROW_QUOTA = parseInt(process.env.MAX_BOOK_BORROW_QUOTA)
    // console.log('jalan queue')
    const book = await Book.find({
        //* dapatkan data buku hanya yang sesuai kriteria
        //* punya QUEUE data & ADA RUANG/QUOTA PEMINJAMAN KOSONG
        $expr: {
            $and: [ //* ada 2 kondisi harus terpenuhi pada tiap dokumen
                {$gt: [{$size: "$queue"}, 0]}, // * queue data > 0
                {$lt: [{$size: '$borrowers'}, MAX_BOOK_BORROW_QUOTA]} // * data jumlah peminjam < MAX_QUOTA
            ]
        }
    }).populate({
            path: 'queue'
        })

    if(book.length > 0){
        for(const book_data of book){
            await cron_func.queueChecking(book_data)
        }
    }
})





// * ----------------------------------- CONTROLLER -----------------------------------

//*! ----------------- POST POST POST

exports.deleteReviews = async (req, res, next) => {
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

        const id_history = req.body.id_history

        const check_review = await BookBorrowingHistory.findById(id_history)//.lean()
        if(!check_review){
            throw_err('History Data ID Not Found', statusCode['404_not_found'])
        }

        if(check_review.id_user.toString() !== user._id.toString()){
            throw_err('Not Authorized', statusCode['401_unauthorized'])
        }

        if(!check_review.review.data){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "You have not written a review for this book"
            })
        }

        // * -------------------------- proses hapus review --------------------------
        check_review.review.data = null
        check_review.review.createdAt = null
        check_review.review.updatedAt = null

        await check_review.save()

        // * ketika sudah maka juga hapus semua komentar terkait

        await Comment.deleteMany({
            id_history : id_history 
        })

        // * -------------------------- --------------------- --------------------------


        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success delete review'
        })

    } catch(e){
        if(!e.statusCode){
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postReviews = async (req, res, next) => {
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

        const id_history = req.body.id_history
        const data = req.body.data

        // * user post reviews "inside/embed" on id_history book data
        const data_history = await BookBorrowingHistory.findById(id_history)
        if(!data_history){
            throw_err('History Data ID Not Found', statusCode['404_not_found'])
        }

        if(data_history.id_user.toString() !== user.id.toString()){
            throw_err('Not Authorized', statusCode['401_unauthorized'])
        }

        //* ------ proses check apakah review BARU / REPLACE  ------
        //*? jika replace maka hanya update data dan update UpdatedAt Properti
        const date_now = new Date()
        if(!data_history.review.data){
            data_history.review.data = data
            data_history.review.createdAt = date_now
            data_history.review.updatedAt = date_now
        } else {
            data_history.review.data = data
            data_history.review.updatedAt = date_now
        }

        await data_history.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Post Reviews Data'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postLikes = async (req, res, next) => {
    try{
        function throw_err(msg, code){
            const err = new Error(msg)
            err.statusCode = code
            throw err
        }

        // * ----------- ----------- checking auth ----------- -----------
        const user = await User.findById(req.userId)
        if(!user){
            throw_err('Not Authorized', statusCode['401_unauthorized'])
        }

        const id_buku = req.body.id_buku
        const book = await Book.findById(id_buku)
        if(!book){
            throw_err('Book ID Data not Found', statusCode['404_not_found'])
        }

        const history_data = await BookBorrowingHistory.findOne({
            id_buku: id_buku, id_user: user._id
        })
        if(!history_data){
            throw_err('Your History Data not Found', statusCode['404_not_found'])
        }

        if(!history_data.finished){
            throw_err("Failed, You Haven't finished reading the book", statusCode['401_unauthorized'])
        }
        // * ----------- ----------- ----------- ----------- ----------- -----------

        const response = {
            errors: false,
            message: 'Success Liked Book'
        }

        //* if it has already been liked -> when trying to like it again, it will become unlike, and of course, the book's like count will be reduced by 1
        if(history_data.like){
            history_data.like = false

            book.like = parseInt(book.like) - 1

            response.message = "Success Un-liked Book"
        } else {
            //* if hasn't been liked -> so like become true and book like count + 1
            history_data.like = true

            book.like = parseInt(book.like) + 1
        }

        await history_data.save()
        await book.save()

        res.status(statusCode['200_ok']).json(response)

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postWishlist = async (req, res, next) => {
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

        const id_buku = req.body.id_buku
        const book = await Book.findById(id_buku)
        if(!book){
            throw_err('Book Data not Found', statusCode['404_not_found'])
        }

        const wishlist_check = await Wishlist.findOne({id_buku: id_buku, id_user: req.userId})
        if(wishlist_check){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: 'The Book Already in Your Wishlists'
            })
        }

        const wishlist = new Wishlist({
            id_buku: id_buku, id_user: req.userId
        })

        await wishlist.save()

        res.status(statusCode['201_created']).json({
            errors: false,
            message: 'Success Add Book to the Wishlist'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postBorrowingBook = async (req, res, next) => {
    try{
        const MAX_BORROW_QUOTA = parseInt(process.env.MAX_BOOK_BORROW_QUOTA) //3
        const DURATION_BORROWING_DAY = parseInt(process.env.DURATION_BORROWING_DAY)
        const TODAY = new Date()
        const DEADLINE_RETURN = new Date(TODAY)
        DEADLINE_RETURN.setDate(TODAY.getDate() + DURATION_BORROWING_DAY)

        const user = await User.findById(req.userId)
            .populate('borrowing') //* populate disini karena ada kemuungkinan dicheck di bawah
        if(!user || user.role !== 'user'){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id_buku = req.body.id_buku

        //* check apakah buku dipinjam penuh tidak (jatah pinjaman) -> SESUAI MAX_BORROW_QUOTA
        const book = await Book.findById(id_buku)
        if(!book){
            const err = new Error('Book Data not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        if(book.borrowers.length >= MAX_BORROW_QUOTA){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "The borrowing Book quota is full, please try to queue in order to borrow this Book"
            })
        }

        //* check apakah kuota peminjaman kita masih (user masih ada kuota untuk pinjam tidak)
        if(user.borrowing.length >= MAX_BORROW_QUOTA){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "Your borrowing quota is full, please return at least one Book first and try again"
            })
        }
        //*! ------------------------ catatan
        //* check kuota user untuk pinjam buku ingin dipinjam dilakukan setelah check kuota buku dahulu untuk menghindari -> sudah dikatakan penuh kemudian kembalikan buku -> ternyata buku ingin dipinjam juga penuh dan harus antre dahulu
        //*! ------------------------

        //* check jika buku coba dimasukan sudah ada di daftar peminjaman
        if(user.borrowing){
            let already_borrow
            user.borrowing.forEach(doc => {
                if(doc.id_buku.toString() === id_buku){
                   already_borrow = true
                }
            })

            if(already_borrow){
                return res.status(statusCode['200_ok']).json({
                    errors: false,
                    message: "You Already Borrow the Book"
                })
            }
        }

        //*? lolos checking maka buat data peminjaman
        //* dokumen peminjaman baru
        const borrow_book = new Borrowing({
            id_buku: id_buku,
            id_user: req.userId,
            date_in: TODAY,
            date_out: DEADLINE_RETURN
        })

        await borrow_book.save()

        user.borrowing.push(borrow_book._id)
        book.borrowers.push(borrow_book._id)
        // console.log(borrow_book)
        // console.log(user.borrowing)
        // console.log(book.borrowers)

        await user.save()
        await book.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Borrow Book, Please Check Borrowing List'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}




exports.postReturnBorrowingBook = async (req, res, next) => {
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

        const id_borrow = req.body.id_borrow
        const check_borrow = user.borrowing.includes(id_borrow)
        if(!check_borrow){
            throw_err("Borrowing ID not Found in User Data", statusCode['404_not_found'])
        }

        const borrow_data = await Borrowing.findById(id_borrow)
            .populate({
                path: 'id_buku',
                select:'page'
            })
            .select('read_page')


        // * nantinya sebelum buat data history baru check dahulu apakah buku sudah pernah dipinjam sebelumnya -> jika iya maka tidak buat dan hanya +1 n_borrowed
        let borrowing_history
        const borrowed_before = await BookBorrowingHistory.findOne({id_buku: borrow_data.id_buku._id, id_user: user._id})
        if(borrowed_before){
            borrowing_history = borrowed_before
            //* hanya akan update halaman ketika UPDATE halaman_peminjaman >= history halaman_peminjaman
            if(borrowing_history.page_finished <= borrow_data.read_page){
                borrowing_history.page_finished = borrow_data.read_page
            }
            borrowing_history.n_borrowed = borrowing_history.n_borrowed + 1
        } else{
            //* jika baru pertama kali pinjam -> make new history data
            borrowing_history = new BookBorrowingHistory({
                id_buku: borrow_data.id_buku._id,
                id_user: user._id,
                page_finished: borrow_data.read_page,
                total_page: borrow_data.id_buku.page,
            })
        }
        //* check apakah sudah selesai belum
        if(borrowing_history.page_finished === borrowing_history.total_page){
            borrowing_history.finished = true
        }
        //* ---------------------- ---------------------- ---------------------- ----------------------



        //* kemudian hapus data pinjam, dan data dari array borrowing buku dan user
        //* hapus dari array book dan user
        //*? get data buku dahulu
        const book_data = await Book.findById(borrow_data.id_buku._id)
            .populate({
                path: 'queue',
                options: {sort : { createdAt: 1}} //*! sorting catatan -> 1 ASC || -1 DESC
            }) //* dipopulate karena akan -> ada checking untuk jika ada antrean akan otomatis dimasukan ke dalam proses borrowing

        const del_borrow_book =  book_data.borrowers.filter(id => id.toString() !== id_borrow)
        const del_borrow_user = user.borrowing.filter(id => id.toString() !== id_borrow)

        book_data.borrowers = del_borrow_book
        user.borrowing = del_borrow_user

        await book_data.save()
        await user.save()

        //* hapus data/dokumen borrowing
        await Borrowing.findByIdAndDelete(id_borrow)
        //* ---------------------- ---------------------- ---------------------- ----------------------

        //* save data history baru
        await borrowing_history.save()


        //* ----------- ----------- ----------- TAMBAHAN ----------- ----------- -----------
        //* juga untuk bantu proses otomatisasi -> ketika sudah kembalikan buku maka bisa langsung untuk check apakah ada antrean -> maka jika ada maka bisa lakukan push 1 antrean tersebut seperti pada proses otomatisasi cron returning book sebelumnya

        if(book_data.queue.length >= 1){
            await cron_func.queueChecking(book_data)
        }


        //* ----------- ----------- ----------- -------- ----------- ----------- -----------

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Returning the Borrowing Book'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postQueueIn = async (req, res, next) => {
    try{
        const MAX_BOOK_QUEUE_QUOTA = 100//parseInt(process.env.MAX_BOOK_QUEUE) //100
        const MAX_USER_QUEUE_QUOTA = parseInt(process.env.MAX_USER_QUEUE)

        const user = await User.findById(req.userId)
            .populate('queue borrowing')
            // * agar dapat lihat data queue misal id_buku dll -> untuk check misal data buku yang akan diinoutkan sudah ada didaftar atau sedang dipinjam maka akan gagal
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id_buku = req.body.id_buku

        const book = await Book.findById(id_buku)
        if(!book){
            const err = new Error('book Data not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        //* check quota ta ta
        if(book.queue.length >= MAX_BOOK_QUEUE_QUOTA){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "Queue Book is Full, please try again later or search another book"
            })
        }

        if(user.queue.length >= MAX_USER_QUEUE_QUOTA){
            return res.status(statusCode['200_ok']).json({
                errors: false,
                message: "Your queue quota is full, please remove one first"
            })
        }

        //* jika kemungkinan sudah queue data yang sama
        if(user.queue){
            let queueIn
            user.queue.forEach(doc => {
                if(doc.id_buku.toString() === id_buku){
                    queueIn = true
                }
            })

            if(queueIn){
                return res.status(statusCode['200_ok']).json({
                    errors: false,
                    message: "Book data already in your queue list"
                })
            }
        }

        //*! catatan
        //* jika diperlukan untuk tambahan check jika buku ditambahkan ke queue sudah ada di dalam daftar buku yang dipinjam
        if(user.borrowing){
            let book_borrowed
            user.borrowing.forEach(doc => {
                if(doc.id_buku.toString() === id_buku){
                    book_borrowed = true
                }
            })

            if(book_borrowed){
                return res.status(statusCode['200_ok']).json({
                    errors: false,
                    message: "Book still being borrowed, you cann't queue this book until returning the book"
                })
            }
        }

        //*! ---------


        //* lolos maka buat data baru
        const new_queue = new Queue({
            id_user: user._id.toString(),
            id_buku: id_buku,
            date_in: new Date()
        })

        await new_queue.save()

        user.queue.push(new_queue._id)
        book.queue.push(new_queue._id)

        await user.save()
        await book.save()

        // console.log(new_queue)
        // console.log(user.queue)
        // console.log(book.queue)

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success add book data to your queue list'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.postQueueOut = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id_queue = req.body.id_queue

        if(!user.queue.includes(id_queue)){
            const err = new Error('Queue ID not Found in User Queue List')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        const queue_data = await Queue.findById(id_queue)
        if(!queue_data){
            const err = new Error('Queue ID not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        const book = await Book.findById(queue_data.id_buku)
        if(!book){
            const err = new Error('Queue ID not Found')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        if(!book.queue.includes(id_queue)){
            const err = new Error('Queue ID not Found in Book Queue List')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        // console.log(user.queue)
        // console.log(book.queue)

        const del_queue_user = user.queue.filter(id => id.toString() !== id_queue)
        const del_queue_book = book.queue.filter(id => id.toString() !== id_queue)

        user.queue = del_queue_user
        book.queue = del_queue_book

        // console.log(id_queue)
        // console.log(user.queue)
        // console.log(book.queue)

        await Queue.findByIdAndDelete(id_queue) //* delete main doc for queue collection
        await user.save()  //* delete doc ref for user doc arrya
        await book.save() //* delete doc ref for book doc array

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Out From Queue"
        })


    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





//*! ----------------- PATCH PATCH PATCH

exports.patchEditUserinfo = async (req, res, next) => {
    try{
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            const err = new Error('Username Error Input')
            err.statusCode = statusCode['400_bad_request']
            err.data = errors.array()
            throw err
        }

        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        user.username = req.body.username
        user.name = req.body.name
        user.address = {
            prov: req.body.provinsi, kota: req.body.kota, kec: req.body.kecamatan
        }

        await user.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Edit User Data"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}





exports.editBorrowsPage = async (req, res, next) => {
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

        const id_borrow = req.body.id_borrow
        const new_page = req.body.page

        const check_borrow = user.borrowing.includes(id_borrow)

        if(!check_borrow){
            throw_err('Borrow ID Not Found in User Borrowing List', statusCode['404_not_found'])
        }

        //* tambahan untuk check nilai update halaman baru saja
        if(new_page <= 0){
            throw_err('New Page Input not Valid', statusCode['400_bad_request'])
        }

        const borrow_data = await Borrowing.findById(id_borrow)
            .populate({
                path: 'id_buku',
                select: 'page'
            })
            .select('id_buku id_user read_page')

        if(new_page > borrow_data.id_buku.page){
            throw_err("New Page Number Cann't Bigger than the Book Page ",statusCode['400_bad_request'])
        }

        borrow_data.read_page = new_page
        //console.log(borrow_data)
        await borrow_data.save()

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: "Success Update Page From User Borrowing List"
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}






exports.deleteWishlists = async (req, res, next) => {
    try{
        const user = await User.findById(req.userId)
        if(!user){
            const err = new Error('Not Authorized')
            err.statusCode = statusCode['401_unauthorized']
            throw err
        }

        const id_buku = req.body.id_buku
        const check_data = await Wishlist.findOne({id_buku: id_buku, id_user: req.userId})
        if(!check_data){
            const err = new Error('Book Data not Found on Your Wishlists')
            err.statusCode = statusCode['404_not_found']
            throw err
        }

        await Wishlist.findOneAndDelete({id_buku: id_buku, id_user: req.userId})

        res.status(statusCode['200_ok']).json({
            errors: false,
            message: 'Success Remove Book Data from Your Wishlists'
        })

    } catch (e) {
        if(!e.statusCode) {
            e.statusCode = statusCode['500_internal_server_error']
        }
        next(e)
    }
}