exports.isAuth = (req, res, next) => {
    if(!req.session.isLoggedIn) {
        return res.redirect('/login')
    }
    next()
}

exports.isLoggedOut = (req, res, next) => {
    if(req.session.isLoggedIn) {
        return res.redirect('/')
    }
    next()
}