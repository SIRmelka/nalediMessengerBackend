const express = require('express')
const cors = require('cors')
const passport = require('passport')
const users = require('./routes/users')
const messages = require('./routes/messages')
require('./middlewares/authentification')

const app = express()

app.use(cors())
app.use(express.json())
app.use(passport.initialize())

const restrictor = passport.authenticate('jwt',{session:false})

app.get('/test',(req,res)=>{
    res.status(401).json("You don't have authorization to fetch data here")
})
app.get('/authenticate',restrictor,(req,res)=>{
    res.status(200).json({
        message: "success",
        id: req.user._id
    })
})
app.use('/user/', users)
app.use('/api/messages/',restrictor, messages)

app.listen(3001, ()=>{
    console.log('server running on port 3001');
})