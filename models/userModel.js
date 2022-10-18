const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const passportLocalMongoose = require('passport-local-mongoose')

const User = mongoose.Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    email: {type:String,require:true,unique:true},
    profile: {type:String,require:true},
    password: {type:String,require:true},
})

User.plugin(uniqueValidator,passportLocalMongoose)

module.exports = mongoose.model('user',User)