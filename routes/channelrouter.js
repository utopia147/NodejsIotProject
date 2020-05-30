const express = require('express')
var router = express.Router()
var channelModel = require('../model/channelmodel')

router.get("/", async (req, res) => {
    await channelModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.post("/", async (req, res) => {
    await channelModel.create(req.body, (err, doc) => {
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
router.post("/:id", async (req, res) => {
    const channelid = req.params.id
    awaitchannelModel.find({ channelid: channelid }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.put('/:id', async (req, res) => {
    channelModel.findByIdAndUpdate(req.params.id, req.body, (err, doc) => {
        if (err) res.json({ querry: 'failed update try again' })
        res.send('update success')
    })
})
router.delete("/:id", async (req, res) => {
    const channelid = req.params.id
    await channelModel.findOneAndRemove({ channelid: channelid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry", msg: "deleted" })
    })
})
module.exports = router;