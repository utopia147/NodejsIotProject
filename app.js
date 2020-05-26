const express = require("express")
const dbconnect = require("./model/db")
const bodyParser = require("body-parser")
const usersModel = require("./model/users")
const nodeMcuModel = require("./model/nodemcu")
const channelModel = require("./model/channel")
const logModel = require("./model/log")
const settimeModel = require("./model/settime")
const itemModel = require("./model/item")

const app = express()

const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded())

app.get("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: Get")
});

app.post("/adduser", (req, res) => {
  usersModel.create(req.body, (err, doc) => {
    if (err) res.json({ failed: "Qurry failed" })
    res.json({
      suscess: "Qurry success",
      username: req.body.username,
      password: req.body.password,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    })
  })
})
app.post("/showuser", (req, res) => {
  const userid = req.body.id
  usersModel.find({ _id: userid }, (err, doc) => {
    if (err) res.json({ qurry: "failed qurry" })
    // res.json(doc.map(doc => doc.username))
    res.send(doc)
  })
})
app.get("/showuserall", (req, res) => {
  usersModel.find((err, doc) => {
    if (err) res.json({ qurry: "failed qurry" })
    // res.json(doc.map(doc => doc.username))
    res.send(doc)
  })
})
app.post("/deleteuser", (req, res) => {
  const userid = req.body.id
  usersModel.findOneAndRemove({ _id: userid }, (err, doc) => {
    if (err) res.json({ qurry: "failed" })
    res.json({ status: "success qurry" })
  })
})

app.post("/updateuser", (req, res) => { })


//nodeMcu
app.post("/api/nodemcu/add", (req, res) => {
  nodeMcuModel.create(req.body, (err, doc) => {
    if (err) res.json({ failed: "Qurry failed" })
    res.json({
      suscess: "Qurry success",
      nodemcuid: req.body.nodemcuid,
      nodemcuStatus: nreq.body.nodemcuStatus,
    })
  })
})
//channel
app.post("/channel/add", (req, res) => {
  channelModel.create(req.body, (err, doc) => {
    if (err) res.json({ result: "Qurry failed" })
    res.json({
      result: "Qurry success",
      channelid: req.body.channelid,
      status: req.body.status,
      channelstatus: req.body.channelstatus,
      channelname: req.body.channelname,
    })
  })
})

//settime
app.post("/settime/add", (req, res) => {
  settimeModel.create(req.body, (err, doc) => {
    if (err) res.json({ result: "Qurry failed" })
    res.json({
      result: "Querry success",
      channelid: req.body.channelid,
    })
  })
})

//item
app.post('/item/add', (req, res) => {
  itemModel.create(req.body, (err, doc) => {
    if (err) res.json({ result: "Qurry failed" })
    res.json({
      result: "Querry success",
      channelid: req.body.channelid,
    })
  })
})
//
// app.put("/", (req, res) => {
//   res.send("Status:" + res.statusCode + " Message: put ");
// });
// app.delete("/", (req, res) => {
//   res.send("Status:" + res.statusCode + " Message: delete");
// });

app.listen(port, () => {
  console.log("App running htpp://localhost:" + port)
})
