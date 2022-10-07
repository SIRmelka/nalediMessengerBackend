const { Router } = require('express')
const express = require('express')
const route = express.Router()
const users = require('../controllers/usersController')

route.get('/',users.getAll)

route.get('/:id',users.getOne)

route.post('/signin',users.signIn)

route.post('/login',users.logIn)

module.exports = route