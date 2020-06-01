const express = require("express")
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../configs/jwtConfig')
var User = require('../model/usersmodel')

//home
router.get('/home', (req, res) => {
    res.json({
        msg: 'Welcome',
        user: {
            firstname: req.user.firstname,
            lastname: req.user.lastname
        }
    })
})
router.get('/page1', (req, res) => {
    res.json({
        msg: 'page1',
        user: {
            firstname: req.user.firstname,
            lastname: req.user.lastname
        }
    })
})
router.get('/faillogin', (req, res) => {
    res.send('Inccorect email or password')
})
router.get('/register', (req, res) => {
    res.send('register')
})
// Login page
router.get('/login', (req, res) => {
    res.send('login')
})

router.post('/login', async (req, res, next) => {
    passport.authenticate('login', {
        successRedirect: '/api/auth/home',
        failureRedirect: '/api/auth/faillogin',
    })(req, res, next)
})
/* POST login. */
router.post('/loginjwt', function (req, res, next) {

    passport.authenticate('login', { session: false }, (err, user, info) => {
        console.log(user);
        if (err || !user) {
            return res.status(400).json({
                message: info ? info.message : 'Login failed',
                user: user
            });
        }

        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }

            const token = jwt.sign(user.id, jwtSecret.secret);

            return res.json({ user, token });
        });
    })
        (req, res);

});

//Logout Handle
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/api/auth/login')
})
module.exports = router