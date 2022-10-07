const { Router } = require('express')
const express = require('express')
const Message = require('../models/messageModel')

const route = express.Router()

route.get('/', (req,res)=>{
    // const message
    res.json('success')
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