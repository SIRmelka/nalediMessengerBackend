const { Router } = require('express')
const express = require('express')
const Message = require('../controllers/messagesController')

const route = express.Router()

route.get('/',Message.getAll)

route.post('/newmessage',Message.createMessage)
route.get('/conversations',Message.getConversations)
route.get('/conversation/:id',Message.getOneConversation)

// route.post('/', (req,res)=>{


module.exports = route