const mongoose = require("mongoose");

var channelSchema = mongoose.Schema({
  channelid: { type: Number, required: true, unique: true },
  nodemcuid: { type: Number, required: true },
  status: { type: Boolean, required: true },
  channelname: String,
  channelstatus: { type: Boolean, required: true },
  __v: { type: Number, select: false },
});

var channelModel = mongoose.model("channel", channelSchema);
module.exports = channelModel;
