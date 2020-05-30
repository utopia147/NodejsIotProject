const express = require('express')
var router = express.Router()
var nodemcuModel = require('../model/nodemcumodel')

router.get("/", (req, res) => {
    nodemcuModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/", (req, res) => {
    nodemcuModel.create(req.body, (err, doc) => {
        if (err) res.json({ failed: "Qurry failed" })
        res.json({
            suscess: "Qurry success",
            nodemcuid: req.body.nodemcuid,
            nodemcuStatus: req.body.nodemcuStatus,
        })
    })
})
router.post("/:id", (req, res) => {
    const nodemcuid = req.params.id
    nodemcuModel.find({ nodemcuid: nodemcuid }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.delete("/:id", (req, res) => {
    const nodemcuid = req.params.id
    nodemcuModel.findOneAndRemove({ nodemcuid: nodemcuid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry", msg: "deleted" })
    })
})
module.exports = router;