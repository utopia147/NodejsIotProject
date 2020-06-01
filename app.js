const express = require("express")
const dbconnect = require("./model/db")
const bodyParser = require("body-parser")
const session = require('express-session')
const passport = require('passport')
var usersRouter = require('./routes/usersrouter')
var channelRouter = require('./routes/channelrouter')
var nodemcuRouter = require('./routes/nodemcurouter')
var itemRouter = require('./routes/itemrouter')
var settimeRouter = require('./routes/settimerouter')
var authen = require('./routes/auth')

const app = express()
const port = process.env.PORT || 3000
//Passport Configs
require('./configs/passport')(passport)
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
app.use('/api/users', passport.authenticate('JWT', { session: false }), usersRouter)
app.use('/api/channel', channelRouter)
app.use('/api/nodemcu', nodemcuRouter)
app.use('/api/item', itemRouter)
app.use('/api/settime', settimeRouter)
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
