const rateLimiter = require('express-rate-limit')

exports.globalLimiter = rateLimiter({
    windowMs : 1000 * 60,
    max : 100,
    handler: (req, res, next) => {
        res.render('rateLimit', {
            pageTitle: "429 - Too Many Request",
            message: "Request Dibatasi, Anda meminta request terlalu banyak, request dibatasi 100 request / menit, silahkan tunggu dan coba lagi."
        })
    }
})

exports.locaLimiter = rateLimiter({
    windowMs : 1000 * 60,
    max : 8,
    handler: (req, res, next) => {
        res.render('rateLimit', {
            pageTitle: "429 - Too Many Request",
            message: "Terlalu banyak percobaan, kami hanya membatasi 8 percobaan / menit, silahkan coba lagi nanti! "
        })
    }
})