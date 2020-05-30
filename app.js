const express = require("express")
const dbconnect = require("./model/db")
const bodyParser = require("body-parser")


const app = express()

const port = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: Get")
});

var usersRouter = require('./routes/usersrouter')
var channelRouter = require('./routes/channelrouter')
var nodemcuRouter = require('./routes/nodemcurouter')
app.use('/api/users', usersRouter)
app.use('/api/channel', channelRouter)
app.use('/api/nodemcu'.nodemcuRouter)
app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next(err);
});




// //settime
// app.post("/settime/add", (req, res) => {
//   settimeModel.create(req.body, (err, doc) => {
//     if (err) res.json({ result: "Qurry failed" })
//     res.json({
//       result: "Querry success",
//       channelid: req.body.channelid,
//     })
//   })
// })

// //item
// app.post('/item/add', (req, res) => {
//   itemModel.create(req.body, (err, doc) => {
//     if (err) res.json({ result: "Qurry failed" })
//     res.json({
//       result: "Querry success",
//       channelid: req.body.channelid,
//     })
//   })
// })
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
