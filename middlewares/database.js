const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.DB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{console.log('Access granted');})
.catch(()=>console.log('Access denied'))

module.exports = mongoose