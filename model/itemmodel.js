const mongoose = require('mongoose')

var itemSchema = mongoose.Schema({
    channelid: { type: Number, required: true },
    itemname: { type: String, required: true }
})

var itemModel = mongoose.model('item', itemSchema)

module.exports = itemModel