const mongoose = require('mongoose')


var setTimeSchema = mongoose.Schema({
    channelid: { type: Number, required: true },
    timeOn: { type: String, default: "00:00:00" },
    timeOff: { type: String, default: "00:00:00" },
    stateOn: { type: Boolean, default: true },
    stateOff: { type: Boolean, default: true }
})

var setTimeModel = mongoose.model('settime', setTimeSchema)
module.exports = setTimeModel