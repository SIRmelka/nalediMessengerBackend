const mongoose = require('../middlewares/database')

const Message = mongoose.Schema({
    from: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        require:true
    },
    to:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    message: {type:String,required:true},
    media:{type:String},
    date: {type:Date},
    seen: {type:Boolean}
})

module.exports = mongoose.model('message',Message)