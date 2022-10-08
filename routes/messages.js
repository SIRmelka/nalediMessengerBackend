const { Router } = require('express')
const express = require('express')
const Message = require('../models/messageModel')

const route = express.Router()

route.get('/', (req,res)=>{
    Message.find()
    .then( messages => res.status(200).json(messages))
    .catch(err => res.status(401).json(err))
})

route.get('/discussions', (req,res)=>{
    Message.find({$or:[{"from.firstName":"god"},{"to.firstName":"god"}]})
    .then( messages => res.status(200).json(messages))
    .catch(err => res.status(401).json(err))
})

route.post('/', (req,res)=>{
    const message = new Message({
            ...req.body
    })

    message.save()
    .then(message => res.status(200).json(message))
    .catch(err => res.status(401).json(err))
})

module.exports = route