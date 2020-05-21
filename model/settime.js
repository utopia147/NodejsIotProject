const mongoose = require('mongoose')


var setTimeSchema = mongoose.Schema({
    channelid: { type: Number, required: true },
    timeOn: { type: String, required: true },
    timeOff: { type: String, required: true },
    stateOn: { type: Boolean, required: true },
    stateOff: { type: Boolean, required: true }
})

var setTimeModel = mongoose.model('settime', setTimeSchema)
module.exports = setTimeModel