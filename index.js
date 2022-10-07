const express = require('express')
const cors = require('cors')
const mongoose = require('./middlewares/database')

const users = require('./routes/users')
const messages = require('./routes/messages')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/test',(req,res)=>{
    res.status(401).json("You don't have authorization to fetch data here")
})

app.use('/user/', users)
app.use('/api/messages/',messages)

app.listen(3001, ()=>{
    console.log('server running on port 3001');
})