const express = require('express')
var router = express.Router()
var channelModel = require('../model/channelmodel')

router.get("/", (req, res) => {
    channelModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/", (req, res) => {
    channelModel.create(req.body, (err, doc) => {
        if (err) res.json({ failed: "Qurry failed" })
        res.json({
            suscess: "Qurry success",
            channelid: req.body.channelid,
            nodemcuid: req.body.nodemcuid,
            status: req.body.status,
            channelname: req.body.channelname,
            channelstatus: req.body.channelstatus,
        })
    })
})
router.post("/:id", (req, res) => {
    const channelid = req.params.id
    channelModel.find({ channelid: channelid }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.delete("/:id", (req, res) => {
    const channelid = req.params.id
    channelModel.findOneAndRemove({ channelid: channelid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry", msg: "deleted" })
    })
})
module.exports = router;