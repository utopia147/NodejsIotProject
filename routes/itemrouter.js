const express = require('express')
var router = express.Router()
var itemModel = require('../model/itemmodel')

router.get('/', (req, res) => {
    itemModel.find((err, doc) => {
        if (err) res.json({ querry: 'failed' })
        res.send(doc)
    })
})
router.post('/', (req, res) => {
    itemModel.create(req.body, (err, doc) => {
        if (err) res.json({
            qurry: 'failed try again',
            Schema: {
                channelid: ['Number', 'required'],
                itemname: ['String', 'required']
            }
        })
        res.json({
            qurry: 'success qury',
            request: [req.body]
        })
    })
})
router.get('/:id', (req, res) => {
    var channelid = req.params.id
    itemModel.find({ channelid: channelid }, (err, doc) => {
        if (err) res.json({
            qurry: 'failed try again',
            msg: 'type channelid or itemname'
        })
        res.send(doc)
    })
})
router.delete('/:id', (req, res) => {
    var id = req.params.id
    itemModel.findByIdAndRemove({ _id: id }, (err, doc) => {
        if (err) res.json({ querry: 'failed try again', Msg: 'type channelid that u want to delete' })
        res.send('Item Deleted')
    })
})
module.exports = router;
