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


app.listen(port, () => {
  console.log("App running htpp://localhost:" + port)
})
