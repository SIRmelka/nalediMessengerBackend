const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const User = mongoose.Schema({
    firstName: {type:String,require:true},
    lastName: {type:String,require:true},
    email: {type:String,require:true,unique:true},
    age: {type:Number,require:true},
    profile: {type:String,require:true},
    password: {type:String,require:true},
})

User.plugin(uniqueValidator)

module.exports = mongoose.model('User',User)