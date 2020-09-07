const express = require("express")
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
var usersModel = require('../model/usersmodel')



// CRUD user
router.get("/", async (req, res, next) => {
    await usersModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/register", async (req, res) => {
    const { email, username, password, firstname, lastname } = req.body
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
    //check password lenght
    if (!checkPass.test(password)) {
        error.push({
            errorStatus: 2,
            msg: {
                characters: 'Password should have character and number and password should have at least 1 lowercase and uppercase',
                length: 'Password at least 6 characters and maximum 32',
                example: 'Mypassword1234'

            }
        })
    }
    //check characters

    if (error.length >= 0) {
        res.json({ error: error, request: { email: email, username: username, password: password, firstname: firstname, lastname: lastname } })
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
        var saveUser = usersModel(req.body)
        saveUser.save((err, doc) => {
            if (err) res.json({ failed: "Qurry failed" })
            res.json({
                suscess: "Qurry success",
            })
        })
        //     })
        // })
    }
})
router.get("/:id", async (req, res) => {
    const id = req.params.id
    await usersModel.findOne({ _id: id }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.put("/:id", async (req, res) => {
    await usersModel.findByIdAndUpdate(req.params.id, { $set: req.body }, (err, doc) => {
        if (err) res.json({ querry: 'failed Update try again' })
        res.send('Update success')
    })
})
router.delete("/:id", async (req, res) => {
    const userid = req.params.id
    await usersModel.findOneAndRemove({ _id: userid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry" })
    })
})
module.exports = router;