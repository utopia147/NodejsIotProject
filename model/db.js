const mongoose = require('mongoose')
var uri = 'mongodb://localhost:27017/iotproject'

mongoose.connect(uri, { useNewUrlParser: true })
mongoose.set('useCreateIndex', true);

mongoose.connection.on('connected', () => {
    console.log('MongoDB Connected')
})
mongoose.connection.on('error', (err) => {
    console.log('MogoDB Erorr')
})
mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnect')
})

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Mongoose default connection disconnection throgh app termination')
        process.exit(0)
    })
})