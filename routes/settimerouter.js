const express = require('express')
var router = express.Router()
var settimeModel = require('../model/settimemodel')

router.get('/', async (req, res) => {
    await settimeModel.find((err, doc) => {
        if (err) res.json({ querry: 'failed try again', msg: 'No Data' })
        res.send(doc)
    })
})
router.post('/', async (req, res) => {
    await settimeModel.create(req.body, (err, doc) => {
        if (err) res.json({
            querry: 'failed try again', Schema: {
                channelid: { type: 'Number', required: 'true' },
                stateOn: { type: 'Boolean', default: 'true' },
                stateOff: { type: 'Boolean', default: 'true' }
            }
        })
        res.json({ querry: 'success query', request: [req.body] })
    })
})
router.get('/:id', async (req, res) => {
    var id = req.params.id
    await settimeModel.findById({ _id: id }, (err, doc) => {
        if (err) res.json({ querry: 'failed try again', Msg: 'send settime id to find' })
        res.send(doc)
    })
})
router.delete('/:id', async (req, res) => {
    var id = req.params.id
    await settimeModel.findByIdAndRemove({ _id: id }, (err, doc) => {
        if (err) res.json({ querry: 'failed try again', Msg: 'send settime id to delete' })
        res.json({ querry: 'success', Msg: 'Set time Deleted' })
    })
})
module.exports = router;
