const { Router } = require('express')
const express = require('express')
const Message = require('../controllers/messagesController')

const route = express.Router()

route.get('/',Message.getAll)
route.delete('/',Message.deleteAll)

route.post('/newmessage/:conversationId',Message.createMessage)
route.get('/conversations/:id',Message.getConversations)
route.get('/conversation/:id',Message.getOneConversation)
route.get('/startDiscussion', Message.findOrCreate)

// route.post('/', (req,res)=>{


module.exports = route