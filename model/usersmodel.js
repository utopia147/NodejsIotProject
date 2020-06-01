const mongoose = require('mongoose')

var usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    __v: { type: Number, select: false }
})

var usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel