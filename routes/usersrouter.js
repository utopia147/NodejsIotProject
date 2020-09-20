const express = require("express")
const router = express.Router()
// const bcrypt = require('bcryptjs')
// const passport = require('passport')
var usersModel = require('../model/usersmodel')
// const { response } = require("express")
// CRUD user
router.get("/", async (req, res, next) => {
    await usersModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
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