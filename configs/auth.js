module.exports = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated())
            return next()

        res.redirect('api/auth/login');
    },
    forwardAuthenticated: (req, res, next) => {
        if (!req.isAuthenticated())
            return next()

        res.redirect('api/auth/register')
    }
}