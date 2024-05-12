const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
})

userModel = mongoose.model('User', userSchema)

module.export = userModel