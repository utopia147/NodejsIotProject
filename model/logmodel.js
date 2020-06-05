const mongoose = require('mongoose')
const channel = require('./channelmodel')
function NOW() {
    var date = new Date();
    var aaaa = date.getFullYear();
    var gg = date.getDate();
    var mm = date.getMonth() + 1;

    if (gg < 10) gg = "0" + gg;

    if (mm < 10) mm = "0" + mm;

    var cur_day = aaaa + "-" + mm + "-" + gg;

    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    if (hours < 10) hours = "0" + hours;

    if (minutes < 10) minutes = "0" + minutes;

    if (seconds < 10) seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;
}
var logSchema = mongoose.Schema({
    channelid: { type: Number, required: true },
    userid: { type: Number, required: true },
    statuslog: { type: String, required: true },
    datelog: { type: String, default: NOW() },
})

var logModel = mongoose.model('log', logSchema)
module.exports = logModel