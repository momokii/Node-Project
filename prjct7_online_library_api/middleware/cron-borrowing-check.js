const Borrowing = require('../models/book_borrowing')
const BookBorrowingHistory = require('../models/books_borrowing_history')
const Book = require('../models/books')
const User = require('../models/users')
const Queue = require('../models/queue')
const statusCode = require('../util/status-code').httpStatus_keyValue

const MAX_BOOK_BORROW_QUOTA = parseInt(process.env.MAX_BOOK_BORROW_QUOTA)
const DURATION_BORROWING = parseInt(process.env.DURATION_BORROWING_DAY)
const TODAY = new Date()
const DEADLINE_RETURN = new Date(TODAY)
DEADLINE_RETURN.setDate(TODAY.getDate() + DURATION_BORROWING)

// * --------------------------------- CRON FUNCTION ---------------------------------


const borrowingCheckout = async (doc) => {
    try {
        /**
         * ! ---------- Catatan ----------
         * * argumen "doc" -> merupakan objek dari data BORROWING dengan populate di id_buku jadi
         * * id_buku : {_id, page} -> page digunakan pada data Borrowing
         * ! ---------- ------- ----------
         */

        let book_history
        // * check apakah user peminjam sudah pernah pinjam buku yang sama
        const check_history_borrow = await BookBorrowingHistory.findOne({
            id_buku: doc.id_buku._id, id_user: doc.id_user
        })


        if(check_history_borrow){
            book_history = check_history_borrow
            if(book_history.page_finished < doc.read_page){
                book_history.page_finished = doc.read_page
            }
            book_history.n_borrowed = book_history.n_borrowed + 1
            console.log('lama')
        }else {
            console.log('baru')
            book_history = new BookBorrowingHistory({
                id_buku: doc.id_buku._id,
                id_user: doc.id_user,
                page_finished: doc.read_page,
                total_page: doc.id_buku.page
            })
        }

        if(book_history.page_finished === book_history.total_page){
            book_history.finished = true
        }

        // * ------ proses input baru/update dokumen borrow dan atur array borrowing user dan book ------
        const book_data = await Book.findById(book_history.id_buku)
            .populate({
                path: 'queue',
                options: {sort : { createdAt: 1}} //*! sorting catatan -> 1 ASC || -1 DESC
            }) //* dipopulate karena akan digunakan misal ada untuk masukan data queue otomatis ke borrowing

        const user_data = await User.findById(book_history.id_user)

        // console.log('buku', book_data.borrowers)
        // console.log('user', user_data.borrowing)

        book_data.borrowers = book_data.borrowers.filter(id => id.toString() !== doc._id.toString())
        user_data.borrowing = user_data.borrowing.filter(id => id.toString() !== doc._id.toString())

        // console.log('buku', book_data.borrowers)
        // console.log('user', user_data.borrowing)
        // console.log(book_history)

        //* hapus data borrowing
        await Borrowing.findOneAndDelete(doc._id.toString())

        //* simpan/update  data history
        await book_history.save()

        //* simpan perubahan array peminjaman user dan buku
        await book_data.save()
        await user_data.save()

        // * Ketika selesai maka coba cek untuk proses jika ada "antrean" untuk bisa langsung dimasukan ke daftar peminjam
        // * tidak cek jika buku dipinjam penuh/tidak karena seharusnya dengan hapus di atas
        if(book_data.queue.length >= 1 ){
            // console.log('masuk queue')
            // * list dimasukan di bawah sudah disorting dari pendaftar paling awal ke akhir secara ASC
            await queueChecking(book_data)
        }

    } catch (e){
        console.log(e)
    }
}





const push_new_borrow = async (doc) => {
    try{
        const user = await User.findById(doc.id_user)
        if(!user || user.borrowing.length >= MAX_BOOK_BORROW_QUOTA){
            throw err
        }

        //* user valid dan buku valid(otomatis buku valid diatas proses borrowingCheckout)
        const book = await Book.findById(doc.id_buku)
        const borrow_book = new Borrowing({
            id_buku: doc.id_buku,
            id_user: doc.id_user,
            date_in: TODAY,
            date_out: DEADLINE_RETURN
        })

        //console.log(book.borrowers, user.borrowing)
        book.borrowers.push(borrow_book._id)
        user.borrowing.push(borrow_book._id)

        //console.log(book.borrowers, user.borrowing)

        await borrow_book.save() //* simpan data pinjam buku


        //* setelah push -> hapus untuk queue list dari array user dan buku serta dokumen terkaitnya
        //console.log(user.queue)

        user.queue = user.queue.filter(id => id.toString() !== doc._id.toString())
        book.queue = book.queue.filter(id => id.toString() !== doc._id.toString())
        await Queue.findByIdAndDelete(doc._id)

        //console.log(user.queue)

        await user.save() //* save perubahan array peminjaman user
        await book.save() //* save perubahan array peminjaman buku

        return true

    } catch (e) {
        console.log('user tidak valid di masukan ke borrowing')
        return false
    }
}





//* ! Ketika Sukses untuk Checkout data Borrow dan ditemukan ada antrean pada buku terakit maka antrean dapat diproses untuk dimasukan ke daftar borrow
const queueChecking = async (book_data) => {
    //* book data -> karena proses masukan user dari antrean (queue) -> yang di sort ASC berdasarkan createdAt(siapa yang masukan dahulu)
    try{
        //* data antrean
        const book_queue_new_borrow = book_data.queue//.slice(0, book_borrow_quota_free)

        //* ----------------------- memproses antrean -----------------------
        //console.log(book_queue_new_borrow)
        for (const doc of book_queue_new_borrow) {
            //* proses antrean sesuai urutan
            //* dilakukan check -> apakah user valid (user ada dan tidak sedang pinjam buku (kuota pinjam user terkait ada))
            //* jika kuota pinjam user penuh -> maka dilanjutkan ke antrian dibelakangnya pada fungsi dibawah ini
            let success_push_new_borrow = await push_new_borrow(doc)

            //* ketika proses penambahan berhasil maka sudah stop proses dan tidak lanjut ke antrean dibelakangnya
            if(success_push_new_borrow){
                break
            }
        }

    } catch (e) {
        console.log(e)
    }
}



module.exports = {
    borrowingCheckout,
    queueChecking
}