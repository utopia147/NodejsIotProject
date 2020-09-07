//Lib
const express = require("express"),
  dbconnect = require("./model/db"),
  bodyParser = require("body-parser"),
  session = require('express-session'),
  passport = require('passport')
//Routes require
var usersRouter = require('./routes/usersrouter'),
  channelRouter = require('./routes/channelrouter'),
  nodemcuRouter = require('./routes/nodemcurouter'),
  itemRouter = require('./routes/itemrouter'),
  settimeRouter = require('./routes/settimerouter'),
  authen = require('./routes/auth'),
  logRouter = require('./routes/logrouter')

var { AuthenRequiredLogin } = require('./configs/auth')
const app = express()
const port = process.env.PORT || 3000

//Passport Configs
require('./configs/passport')(passport)
var AuthenRequiredJwt = passport.authenticate('JWT', { session: false })

//Bodyparser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//Express Session
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}))
//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Routes
app.use('/api/users', usersRouter)
app.use('/api/channel', AuthenRequiredLogin, channelRouter)
app.use('/api/nodemcu', AuthenRequiredLogin, nodemcuRouter)
app.use('/api/item', AuthenRequiredLogin, itemRouter)
app.use('/api/settime', AuthenRequiredLogin, settimeRouter)
app.use('/api/log', AuthenRequiredLogin, logRouter)
app.use('/api/auth', authen)


app.use((req, res, next) => {
  var err = new Error("ไม่พบ path ที่คุณต้องการ");
  err.status = 404;
  next();
});


app.get("/", (req, res) => {
  res.send("Status:" + res.statusCode + " Message: NodeJS Running")
});

app.listen(port, () => {
  console.log("Server is running htpp://localhost:" + port)
})
