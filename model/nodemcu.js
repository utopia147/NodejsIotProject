const mongoose = require("mongoose");
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

var nodeMcuSchema = mongoose.Schema({
  nodemcuid: { type: Number, required: true, unique: true },
  nodemcuStatus: { type: String, required: true },
  dateConnection: { type: String, default: NOW() },
  __v: { type: Number, select: false },
});

var nodeMcuModel = mongoose.model("nodemcu", nodeMcuSchema);
module.exports = nodeMcuModel;
