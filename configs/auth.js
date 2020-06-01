module.exports = {
    AuthenRequiredLogin: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/api/auth/register');
    },
    AuthenticatedNoRequired: function (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/api/auth/home');
    }
}