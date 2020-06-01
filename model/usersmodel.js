const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
var usersSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    __v: { type: Number, select: false }
})
usersSchema.pre('save', function (next) {
    if (this.password) {
        console.log(this.password)
        bcrypt.genSalt(10, async (err, salt) => {
            await bcrypt.hash(this.password, salt, (err, hash) => {
                this.password = hash
                console.log(hash)
                return next()
            })
        })
    }
    else { console.log('failed') }

})
var usersModel = mongoose.model('users', usersSchema)
module.exports = usersModel