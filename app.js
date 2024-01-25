const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')

require('dotenv').config()

const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/signub' , require('./routes/signub'))
app.use('/api/login' , require('./routes/login'))
app.use('/api/user' , require('./routes/user'))
app.use('/api/todos' , require('./routes/todos'))
app.use('/api/refresh-token' , require('./routes/refreshToken'))
app.use('/api/signout' , require('./routes/signout'))

app.get('/', (req, res) =>{
    res.send('hello world')
})

app.listen(port, () => {

    console.log(`Server is running on port ${port}`) 
})