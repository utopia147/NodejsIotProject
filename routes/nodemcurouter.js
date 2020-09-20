const express = require('express')
var router = express.Router()
var nodemcuModel = require('../model/nodemcumodel')

router.get("/", async (req, res) => {
    await nodemcuModel.find((err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        var DateCurrent = new Date().toUTCString();
        console.log(DateCurrent);
        res.json(doc)
    })
})
router.post("/", async (req, res) => {
    await nodemcuModel.create(req.body, (err, doc) => {
        if (err) res.json({ failed: "Qurry failed" })
        res.json({
            suscess: "Qurry success",
            nodemcuid: req.body.nodemcuid,
            nodemcuStatus: req.body.nodemcuStatus,
        })
    })
})
router.post("/:id", async (req, res) => {
    const nodemcuid = req.params.id
    await nodemcuModel.find({ nodemcuid: nodemcuid }, (err, doc) => {
        if (err) res.json({ qurry: "failed qurry" })
        // res.json(doc.map(doc => doc.username))
        res.send(doc)
    })
})
router.put("/:id", async (req, res) => {
    console.log(req.params.id);
    await nodemcuModel.findOneAndUpdate({ nodemcuid: req.params.id }, { $set: req.body }, (err, doc) => {
        if (err) res.json({ querry: 'failed Update try again' })
        res.send('Update success')
    })
})
router.delete("/:id", async (req, res) => {
    const nodemcuid = req.params.id
    await nodemcuModel.findOneAndRemove({ nodemcuid: nodemcuid }, (err, doc) => {
        if (err) res.json({ qurry: "failed" })
        res.json({ status: "success qurry", msg: "deleted" })
    })
})
module.exports = router;