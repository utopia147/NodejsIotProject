const express = require('express'),
    logModel = require('../model/logmodel'),
    channelModel = require('../model/channelmodel'),
    userModel = require('../model/usersmodel')
var router = express.Router()


router.get('/', (req, res) => {
    logModel.find((err, doc) => {
        if (err) console.log(err)
        else res.json(doc)
    })
})

router.post('/search', (req, res) => {
    for (var i in req.body) {
        req.body[i] = { $regex: req.body[i], $options: "i" }
        console.log(req.body)
    }
    userModel.find(req.body, (err, user) => {
        if (user == undefined)
            return res.json({ status: '404', msg: 'cannot find userid' })
        if (user)
            logModel.find(req.body, (err, doc) => {
                if (err) res.json(err)
                else
                    res.json({ User: user, Log: doc })
            })
    })

})
router.post('/', (req, res) => {
    channelModel.findOne({ channelid: req.body.channelid }, (err, doc) => {
        if (err) return console.log(err)
        if (doc == undefined)
            return res.json({ status: '404', msg: 'No Channel ID:' + req.body.channelid + ' You need to add or change your Channel ID ' })
        if (doc.channelid == req.body.channelid) {
            console.log(doc)
            var saveLog = logModel(req.body)
            saveLog.save((err, doc) => {
                if (err) res.send({
                    error: {
                        type: {
                            channelid: { type: 'Number', required: 'true' },
                            userid: { type: 'Number', required: 'true' },
                            statuslog: { type: 'String', required: 'true' },
                        },
                        msg: 'Need channelid at least 1'

                    }
                })
                else res.json({ result: 'success', msg: 'log save already' })
            })
        }
        if (doc.channelid != req.body.channelid) res.json({ result: 'failed', msg: 'No Channel ID you want to save log' })
    })
})
module.exports = router
