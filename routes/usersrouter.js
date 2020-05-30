const express = require("express")
var router = express.Router()
var usersModel = require('../model/usersmodel')

router.get("/", async (req, res) => {
    await usersModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/", async (req, res) => {
    await usersModel.create(req.body, (err, doc) => {
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
router.get("/:id", async (req, res) => {
    const userid = req.params.id
    await usersModel.find({ _id: userid }, (err, doc) => {
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