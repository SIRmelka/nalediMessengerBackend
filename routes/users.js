const { Router } = require('express')
const express = require('express')
const route = express.Router()
const users = require('../controllers/usersController')
const passport = require('passport')

route.get('/',users.getAll)
route.delete('/',users.deleteAll)

route.get('/:id',users.getOne)

route.post('/signup',users.signIn)

route.post('/login',users.logIn)

module.exports = route