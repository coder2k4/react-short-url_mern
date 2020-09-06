// npm init
// npm i express mongoose
// npm i -D nodemon concurrently
// npm i config
// npm i bcryptjs
// npm i express-validator
// npm i jsonwebtoken
// @client npm install materialize-css@next
// @client npm i react-router-dom


const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended: true})) // Для распарсивания BODY
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/link', require('./routes/link.routes'))
app.use('/t', require('./routes/redirect.routes'))

if(process.env.NODE_ENV === 'production')
{
    app.use('/', express.static(path.join(__dirname,'client', 'build')))
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'))
    })
}

const PORT = config.get('port') || 5000
const mongoURI = config.get('mongoURI')


async function start() {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB CONNECTED')
    } catch (e) {
        console.log('Server error: ', e.message)
        process.exit(1)
    }
}
start()

app.listen(PORT, () => console.log(`app started on ${PORT}`))