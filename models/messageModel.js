const mongoose = require('../middlewares/database')

const Message = mongoose.Schema({
    from: {
        _id:{type:String},
        firstName : {type:String},
        lastName : {type:String},
    },
    to: {
        _id:{type:String},
        firstName : {type:String},
        lastName : {type:String},
    },
    message: {type:String},
    media:{type:String},
    date: {type:Date},
    seen: {type:Boolean}
})

module.exports = mongoose.model('message',Message)