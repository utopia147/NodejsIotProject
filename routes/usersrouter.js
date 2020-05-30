const express = require("express")
var router = express.Router()
var usersModel = require('../model/usersmodel')

router.get("/", (req, res) => {
    usersModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/", (req, res) => {
    usersModel.create(req.body, (err, doc) => {
        if (err) res.json({ failed: "Qurry failed" })
        res.json({
            suscess: "Qurry success",
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        })
    })
})
router.post("/:id", (req, res) => {
    const userid = req.params.id
    usersModel.find({ _id: userid }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.delete("/:id", (req, res) => {
    const userid = req.params.id
    usersModel.findOneAndRemove({ _id: userid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry" })
    })
})
module.exports = router;