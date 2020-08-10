const express = require('express')
const api = require('./api/index')
const helmet = require('helmet')
const morgan = require('morgan')
require('dotenv').config()

const middlewares = require('./middleware')
const connection = require('./db')

const app = express()

app.use(morgan('tiny'))
app.use(express.json())
//This is helmet library is use for seacurity 
app.use(helmet())

app.get('/', (req, res) => {
    res.json({
        message: project.message,
    });
});

//This is route from other end point
app.use('/api/v1', api)

//This is error catch middleware
app.use(middlewares.errorHandler)
app.use(middlewares.notFound)
app.use(connection)

module.exports = app
