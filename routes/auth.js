const express = require("express")
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../configs/jwtConfig')
var usersModel = require('../model/usersmodel')
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/avatar');
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
    },
})
const fileFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}
var upload = multer({ storage: storage, fileFilter: fileFilter })

//home
router.get('/home', (req, res) => {
    res.json({
        status: 'Success',
        user: {
            userid: req.user._id,
            email: req.user.email
        },
        msg: 'Login successfuly'
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
    res.json({
        status: 'Failed',
        user: {
            email: 'enter your email',
            password: 'enter your password'
        },
        msg: 'Email or Password Incorrect'
    })
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
        failureRedirect: '/api/auth/faillogin'
    })(req, res, next)
})
/* POST login. */
router.post('/loginjwt', async (req, res, next) => {

    await passport.authenticate('login', { session: false }, (err, user, info) => {
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

router.post("/register", upload.single('avatar'), async (req, res) => {
    const { email, username, password, firstname, lastname } = req.body
    var avatar;
    console.log(email)
    console.log(username)
    console.log(password)
    console.log(firstname)
    console.log(lastname)

    var checkPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{6,32}$/
    let error = []
    //check req fields
    if (!username || !password || !firstname || !lastname || !email) {
        error.push({ errorStatus: 1, msg: 'Please enter all field' })
    }
    if (!req.file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        console.log(error)
        avatar = req.body.avatar
    }
    if (req.file) {
        avatar = req.file.path.replace(/\\/g, '/')
        console.log(avatar);

    }
    //check password lenght
    if (!checkPass.test(password)) {
        error.push({
            errorStatus: 2,
            msg: {
                characters: 'Password should have character and number Password should have at least 1 lowercase and uppercase',
                length: 'Password at least 6 characters and maximum 32',
                example: 'Mypassword1234'

            }
        })
    }
    //check characters

    if (error.length > 0) {
        res.json({ response: error, request: { email: email, username: username, password: password, firstname: firstname, lastname: lastname, avatar: avatar } })
    }
    else {

        // await bcrypt.genSalt(10, async (err, salt) => {
        //     await bcrypt.hash(req.body.password, salt, async (err, hash) => {
        //         if (err) throw err
        //         req.body.password = hash
        //         await usersModel(req.body).save((err, doc) => {
        //             if (err) res.json({ failed: "Qurry failed" })
        //             res.json({
        //                 suscess: "Qurry success",
        //                 email: req.body.email,
        //                 username: req.body.username,
        //                 password: req.body.password,
        //                 firstname: req.body.firstname,
        //                 lastname: req.body.lastname,
        //             })
        // })
        // 
        var saveUser = usersModel({ email: email, username: username, password: password, firstname: firstname, lastname: lastname, avatar: avatar })
        saveUser.save((err, doc) => {
            if (err) res.json({ response: [{ failed: "Qurry failed" }] })
            res.json({
                response: [{ suscess: "Qurry success", }]
            })
        })
        //     })
        // })
    }
})
//Logout Handle
router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/api/auth/login')
})
module.exports = router