const mongoose = require('mongoose')
// const {MessageSchema} = require('../models/messageModel')
const MessageSchema = require('../models/messageModel')

const Conversation = mongoose.Schema({
    users: [{type:mongoose.Schema.Types.ObjectId, ref:'user'}],
    messages: [{type:mongoose.Schema.Types.ObjectId, ref:'message'}]
})

module.exports = mongoose.model("conversation", Conversation)

