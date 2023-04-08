exports.error404 = (req, res, next) => {
    res.status(404).render('404', {
        pageTitle: '404, Halaman Tidak Ditemukan!'
    })
}


exports.error500 = (error, req, res, next) => {
    console.log(error)
    res.status(500).render('500', {
        pageTitle: 'Error 500'
    })
}